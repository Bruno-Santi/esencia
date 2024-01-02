<h1>MongoDB Atlas deployment</h1>

<il>
<li>Create a project.</li>
<li>Create a database called <b>"essenciaIA_app"</b>.</li>
<li>Create a collection called <b>"survey_data"</b>.</li>
<img src="../img/Screenshot 2023-12-27 172414.png" width=800 height='auto'>
<li>Go to database in the left menu, click connect, click drivers and choose python version 3.11.
you will have something like the image below.</li>
<img src="../img/Screenshot 2023-12-27 173127.png" width=600 height='auto'>
<li>Go to gcp (google cloud) and change the uri following the format.</li>
<pre>
what you got from mongodb atlas: 
mongodb+srv://<username>:<password>@esenciaia.xeknyc8.mongodb.net/?retryWrites=true&w=majority
The format you have to follow:
uri = f"mongodb+srv://{user}:{pwd}@esenciaia.xeknyc8.mongodb.net/?retryWrites=true&w=majority"

you have to replace <username> and <password> for {user} and {pwd}, as well as put it in "" and add the prefix f.

</pre>
<li>The final step, you have to change the enviroment variables in gcp, unless you choose the same username and password.</li>

</il>