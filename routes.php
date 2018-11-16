<?php
use Slim\Http\Request;
use Slim\Http\Response;
// Routes
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});
$app->get('/heroes', function ($request, $response, $args) {
    $sth = $this->db->prepare(
        "SELECT * FROM Heroes ORDER BY id"
    );
    $sth->execute();
    $users = $sth->fetchAll();
    return $this->response->withJson($users);
});
$app->get('/hero/[{id}]', function ($request, $response, $args) {
    $sth = $this->db->prepare(
        "SELECT * FROM Heroes WHERE id=:id"
    );
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    $user = $sth->fetchObject();
    return $this->response->withJson($user);
});
$app->post('/hero', function ($request, $response) {
    $input = $request->getParsedBody();
    $sql = "INSERT INTO 
        Heroes (name) 
        VALUES (:name)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("name", $input['name']);
    $sth->execute();
    return $this->response->withJson($input);
});

//GET REQUESTS


//return all users
$app->get('/users', function ($request, $response, $args){
    $sth = $this->db->prepare(
        "SELECT * FROM Users"
    );
    $sth->execute();
    $users = $sth->fetchAll();
    return $this->response->withJson($users);
});

//get all data for one user
$app->get('/users/[{email}]', function ($request, $response, $args){
    $sth = $this->db->prepare(
        "SELECT * FROM Users WHERE email=:email"
    );
    $sth->bindParam("email", $args['email']);
    $sth->execute();
    $user = $sth->fetchObject();
    return $this->response->withJson($user);
});

//return emails
$app->get('/email', function ($request, $response, $args){
    $sth = $this->db->prepare(
        "SELECT email FROM Users"
    );
    $sth->execute();
    $emails = $sth->fetchAll();
    return $this->response->withJson($emails);
});

//get password for an account
$app->get('/passW/[{email}]', function ($request, $response, $args){
    $sth = $this->db->prepare(
        "SELECT passW FROM Users WHERE email=:email"
    );
    $sth->bindParam("email", $args['email']);
    $sth->execute();
    $passW = $sth->fetchObject();
    return $this->response->withJsoon($passW);
});

//get all children associated with an individual email
$app->get('/children/[{email}]', function ($request, $response, $args){
    $sth = $this->db->prepare(
        "SELECT * FROM Children WHERE parent=:email"
    );
    $sth->bindParam("email", $args['email']);
    $sth->execute();
    $children = $sth->fetchObject();
    return $this->response->withJson($children);
});

//get all posts
$app->get('/posts', function ($request, $response, $args){
    $th = $this->db->prepare(
        "SELECT * FROM Posts"
    );
    $sth->execute();
    $posts = $sth->fetchAll();
    return $this->response->withJson($posts);
});

//gets a post based on the posting id
$app->get('/post/[{id}]', function ($request, $response, $args){
    $sth = $this->db->prepare(
        "SELECT * FROM Posts WHERE id=:id"
    );
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    $post = $sth->fetchObject();
    return $this->response->withJson($post);
});

//get all comments
$app->get('/comments', function ($request, $response, $args){
    $th = $this->db->prepare(
        "SELECT * FROM Comments"
    );
    $sth->execute();
    $comments = $sth->fetchAll();
    return $this->response->withJson($comments);
});

//gets a comment based on the posting id
$app->get('/comment/[{id}]', function ($request, $response, $args){
    $sth = $this->db->prepare(
        "SELECT * FROM Comments WHERE id=:id"
    );
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    $comment = $sth->fetchObject();
    return $this->response->withJson($comment);
});


//POST REQUESTS

$app->post('/user', function ($request, $response) {
        $input = $request->getParsedBody();
        $sql = "INSERT INTO 
            users (email, userName, passw) 
            VALUES (:email, :userName, :passw)";
        $sth = $this->db->prepare($sql);
        $sth->bindParam("email", $input['email']);
        $sth->bindParam("userName", $input['userName']);
        $sth->bindParam("passw", $input['passw']);
        $sth->execute();
        return $this->response->withJson($input);
    });

$app->post('/children', function ($request, $response) {
        $input = $request->getParsedBody();
        $sql = "INSERT INTO 
            children (parent, firstName, lastName, gender, birthday)
            VALUES (:parent, :firstName, :lastName, :gender, :birthday)";
        $sth = $this->db->prepare($sql);
        $sth->bindParam("parent", $input['parent']);
        $sth->bindParam("firstName", $input['firstName']);
        $sth->bindParam("lastName", $input['lastName']);
        $sth->bindParam("gender", $input['gender']);
        $sth->bindParam("birthday", $input['birthday']);
        $sth->execute();
        return $this->response->withJson($input);
    });