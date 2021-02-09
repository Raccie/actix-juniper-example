A simple example implementation of a GraphQL Server with Actix-Web.  
For a real front-end implementation, you can use any single page application framework and link Actix to the build directory.

# How to use:
Create a ```.env``` file from the ```example.env``` in the backend directory and change attributes accordingly

If you haven't installed Diesel yet, run:
```shell
cargo install diesel_cli --no-default-features --features postgres
```
 
To create the necessary tables, run
```bash
DATABASE_URL=postgres://username:password@localhost:5432/dbname 
diesel migration run
```

You can now use ```cargo run``` to start the Actix server. It serves GraphQL on http://127.0.0.1:8080/graphql and GraphQL
Playground on http://127.0.0.1:8080/playground

Actix also serves the built React-App if it exists on http://127.0.0.1:8080/


## Change the Frontend
The frontend can be interchanged easily, just change the the path in ```handlers::app_config``` accordingly.

<br/><br/>
I hope this can help some people with Rust and Juniper