from flask import Flask, render_template, request, Response

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def cme_test():
    if request.method == 'GET':
        return render_template('test.html')
    elif request.method == 'POST':
        print "################"
        print request.form
        print "################"
        return render_template('test.html')

    #return ('hello world')

if __name__ == '__main__':
    app.run(debug=True)
