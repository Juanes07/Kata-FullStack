package com.sofka.kata.Controller;

import com.sofka.kata.Model.Todo;
import com.sofka.kata.Service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    private TodoService todoService;


    @GetMapping(value = "api/todos")
    public Iterable<Todo> list() {
        return todoService.list();
    }

    @PostMapping(value = "api/todo")
    public Todo save(@RequestBody Todo todo) {
        return todoService.save(todo);
    }

    @PutMapping(value = "api/todo")
    public Todo update(@RequestBody Todo todo) {
        if (todo.getId() != null) {
            return todoService.save(todo);
        }
        throw new RuntimeException("No existe el ToDo");
    }

    @DeleteMapping(value = "api/{id}/todo")
    public void delete(@PathVariable("id") Long id) {
        todoService.delete(id);
    }

    @GetMapping(value = "api/{id}/todo")
    public Todo get(@PathVariable("id") Long id) {
        return todoService.get(id);
    }

}
