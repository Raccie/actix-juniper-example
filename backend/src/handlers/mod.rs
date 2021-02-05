mod graphql;

use actix_files as fs;
use actix_web::{web, HttpResponse};
use deadpool_postgres::Pool;
use juniper::http::{playground::playground_source, GraphQLRequest};
use std::sync::Arc;
use graphql::{create_schema, Schema, Context};
use crate::{repositories::post::get_post_loader, config::HashingService};

pub fn app_config(config: &mut web::ServiceConfig) {
    let schema = create_schema();
    config
        .data(schema)
        .service(web::resource("/graphql").route(web::post().to(graphql)))
        .service(web::resource("/playground").route(web::get().to(playground)));
        //.service(fs::Files::new("/", "../frontend/build/").index_file("index.html"));
    // TODO FUCK

}

async fn playground() -> HttpResponse {
    let html = playground_source("/graphql", None);
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(html)
}

async fn graphql(
    data: web::Json<GraphQLRequest>,
    schema: web::Data<Schema>,
    pool: web::Data<Pool>,
    hashing_service: web::Data<HashingService>
) -> HttpResponse {
    let pool: Arc<Pool> = pool.into_inner();
    let hashing: Arc<HashingService> = hashing_service.into_inner();
    let post_loader = get_post_loader(pool.clone());
    let context = Context { pool, hashing, post_loader };
    let res = data.execute(&schema, &context).await;

    HttpResponse::Ok().json(res)
}
