// begin actual script
$(document).ready(function() {
    // @todo: refactor and replace
    render_table(test_payload, test_field_order)

    $(':button').live('click', function(event) {
        if(event.preventDefault) event.preventDefault(); else event.returnValue = false;
        var button = $(this).val();

        // submit conflict to server
        if (button == 'submitConflict') {
            $.ajax({
                url: '/',
                type: 'POST',
                data: $( '#conflict_form').serializeArray(),
                success: function() {
                    alert('Submit successful');
                    location.reload();
                    alert('Submission successful');
                },
                error: function( xhr, status ) {
                    alert('An error was thrown: ' + status);
                },
                failure: function( xhr, status ) {
                    alert('.ajax post failed')
                }
            });
        }

        // clears user form data
        if (button == 'clearConflict') {
            $(':input','#conflict_form')
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .removeAttr('checked')
            .removeAttr('selected');
        }

        // loads new conflict for the user to inspect
        if (button == 'skipConflict') {
            alert("skip called")
            $.ajax({
                url: '/',
                type: 'GET'
            });
        }

        // sends a flag request to the server to mark data as potentially dirty
        if (button == 'flagConflictForValidity') {
            alert("conflict should be flagged");
        }
    });
});

// begin test data
test_payload = {
    'conflicts_bin': {
        'page': [{
            'id': 'be94fd4614dc4a1dbf431a1bb527d287',
                'value': '323-233',
                'votes': 0
        }, {
            'id': '8c653b96d23440e48576532f534bd283',
                'value': '289-299',
                'votes': 0
        }],
        'title': [{
            'id': 'be94fd4614dc4a1dbf431a1bb527d287',
                'value': 'The history of Domokuns.',
                'votes': 0
        }, {
            'id': '8c653b96d23440e48576532f534bd283',
                'value': 'The history of Domokins.',
                'votes': 0
        }]
    },
    'resolved_bin': {
        'publisher': 'Elsevier',
        'author': 'tim tom',
        'date': 2009
    }
};

test_field_order = 
[
'title',
'author',
'page',
'container-title',
'container-title-short',
'DOI',
'PMID',
'PMCID',
'id',
'event',
'collection-title', 
'container-author', 
'ISBN', 
'version', 
'issued', 
'abstract', 
'jurisdiction', 
'archive_location', 
'number', 
'authority', 
'edition', 
'references', 
'keyword', 
'composer', 
'editorial-director', 
'original-date', 
'original-publisher', 
'annote', 
'container', 
'dimensions', 
'volume', 
'section', 
'ISSN', 
'archive', 
'note', 
'event-place', 
'event-date', 
'year-suffix', 
'editor', 
'reviewed-author', 
'number-of-volumes', 
'journalAbbreviation', 
'type', 
'archive-place', 
'status', 
'medium', 
'reviewed-title', 
'publisher', 
'URL', 
'call-number', 
'citation-label', 
'chapter-number', 
'translator', 
'original-publisher-place', 
'collection-editor', 
'scale', 
'collection-number', 
'genre', 
'first-reference-note-number', 
'interviewer', 
'recipient', 
'categories', 
'publisher-place', 
'citation-number', 
'director', 
'page-first', 
'title-short', 
'illustrator', 
'language', 
'shortTitle', 
'locator',
'issue', 
'original-title', 
'submitted', 
'number-of-pages', 
'original-author', 
'source',  
'accessed'
];
