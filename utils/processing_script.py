import uuid
import mock_raw_db
import pprint


# fields we don't want to to the Conflict data structure
ignored_fields = [unicode("id")]

# mock payload of 'matched groups' for conflict detection
matched_groups = mock_raw_db.get_raw()

# @todo: alter to accept a single list of dicts
# for every group of citations within the payload
for matched_group in matched_groups:
    # create a container to store fields with possible values
    fields_container = {}
    # and a counter to track how many citations have a given field
    fields_counter = {}
    # determine the number of citations within this matched group
    number_of_citations = len(matched_group)

    # for every citation within a matched group
    for citation in matched_group:
        # grab every field and possible_value
        for field, possible_value in citation.items():
            # skip field if we don't care about it
            if field in ignored_fields:
                pass
            else:
                # if this field hasn't been seen before
                if field not in fields_container:
                    # add a list to container to store possible values
                    fields_container[field] = []
                    # and add a counter to track the number of citations with said field
                    fields_counter[field] = 0

                # if unique, add the possible value to its respective field 'list'
                if possible_value not in fields_container[field]:
                    fields_container[field].append(possible_value)

                # increment the number of citations containing this field
                fields_counter[field] += 1

    # create the new conflict data structure
    to_conflict_engine = {
        "conflicts_bin": {},
        "resolved_bin": {}
    }

    # for every field found in the citations
    for field, possible_values in fields_container.items():
        # if _all_ citations had the same value
        # @todo: modify to at least 2
        if len(possible_values) is 1 and fields_counter[field] is number_of_citations:
            # put it in the resolved bucket
            to_conflict_engine["resolved_bin"][field] = possible_values[0]
        # otherwise, add it to the conflict bucket
        else:
            to_conflict_engine["conflicts_bin"][field] = possible_values

    # scrub conflicts to unique ids and 'votes'
    temp_conflicts = {}

    # for every field and possible value
    for field, possible_values in to_conflict_engine['conflicts_bin'].items():
        # create a list to store the value with id/votes
        values = []
        # transform into dict with id/votes and append to container
        for value in possible_values:
            values.append({
                "value": value,
                "id": uuid.uuid4().hex,
                "votes": 0
            })
        # add transformed values to new conflicts dict
        temp_conflicts[field] = values

    # add completed conflicts dict to dict for processing
    to_conflict_engine['conflicts_bin'] = temp_conflicts
    pprint.pprint(to_conflict_engine)