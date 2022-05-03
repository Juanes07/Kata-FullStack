package com.sofka.kata.Controller;

import com.sofka.kata.Model.Todo;
import com.sofka.kata.Service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class TodoController {

    @Autowired
    private TodoService todoService;


    @GetMapping(value = "/todos")
    public Iterable<Todo> list() {
        return todoService.list();
    }

    @PostMapping(value = "/todo")
    public Todo save(@RequestBody Todo todo) {
        return todoService.save(todo);
    }

    @PutMapping(value = "/todo")
    public Todo update(@RequestBody Todo todo) {
        if (todo.getId() != null) {
            return todoService.save(todo);
        }
        throw new RuntimeException("No existe el ToDo");

    }

    @DeleteMapping(value = "/{id}/todo")
    public void delete(@PathVariable("id") Long id) {
        todoService.delete(id);
    }

    @GetMapping(value = "/{id}/todo")
    public Todo get(@PathVariable("id") Long id) {
        return todoService.get(id);
    }

}
