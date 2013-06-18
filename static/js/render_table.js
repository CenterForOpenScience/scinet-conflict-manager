// @todo: To make this more modular, should 'render' -> 'render_table' and
// @todo: have it populate a table based on a payload and a list of fields in a given order?
// @todo: i.e. function render_table(payload, field_order) {}

// populates a table with conflicted and non-conflicted fields from a payload
function render_table(payload, field_order) {
    
    // Initialize DOM elements
    var radio

    // set the table header
    table_header = $('<thead><th>Name</th><th>Value</th></thead>');
    table_header.appendTo("#conflict_table");

    // Iterate over fields
    $.each(field_order, function(field_idx, field_name) {
        
        // Check for field in conflict
        if (field_name in payload['conflicts_bin']) {
            // Initialize row
            var row = $('<tr class="warning"></tr>');
            // Create name column
            var name_col = $('<td class="span1"></td>');
            name_col.text(capitaliseFirstLetter(field_name));
            // Initialize value column
            var value_col = $('<td class="span2"></td>');
            // Get possible values
            possible_values = payload['conflicts_bin'][field_name];
            
            // Iterate over possible values
            $.each(possible_values, function(poss_idx, possible_value) {
                // Create radio button
                var radio = $('<input type="radio" ></input>');
                radio.attr('name', field_name);
                radio.attr('value', possible_value.value);
                radio.appendTo(value_col);
                // Create label span
                var span = $('<span></span>');
                span.text(possible_value.value);
                span.appendTo(value_col);
                // Add line break
                $('<br />').appendTo(value_col);
            });

            // add user input radio/text
            var radio = $('<input type="radio"></input>');
            radio.attr('name', field_name);
            radio.attr('id', field_name);
            radio.appendTo(value_col);
            var input = $('<input type="text" placeholder="Other answer..."></input>');
            // check respective radio when user selects text input
            input.focus(function() {
                radio.attr('checked', 'checked');
            })
            // update respective radio when user enters text input
            input.keyup(function(){
                radio.attr('value', input.val());
            });
            input.attr('id', field_name+'editBox');
            input.appendTo(value_col);
            // Append columns to row
            row.append(name_col);
            row.append(value_col);
            // Append row to table
            row.appendTo("#conflict_table")
            
        // Check for field in resolved
        } else if (field_name in payload['resolved_bin']) {
            // Initialize row
            var row = $('<tr class="success"></tr>');
            // Create name column
            var name_col = $('<td class="span1"></td>');
            name_col.text(capitaliseFirstLetter(field_name));
            // Create value column
            var value_col = $('<td class="span2"></td>');
            // Create label span
            var span = $('<span></span>');
            span.text(payload['resolved_bin'][field_name]);
            span.appendTo(value_col);
            // Append columns to row
            row.append(name_col);
            row.append(value_col);
            // Append row to table
            row.appendTo("#conflict_table")
        }
    });
}

// capitalises the first letter in a string
function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}