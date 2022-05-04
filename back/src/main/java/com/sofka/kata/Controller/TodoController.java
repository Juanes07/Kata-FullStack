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
    /**
     * Sobreescritura del service por medio del objeto todoservice de tipo TodoService
     */
    @Autowired
    private TodoService todoService;

    /**
     * En listar los ToDos en base de datos
     *
     */
    @GetMapping(value = "api/todos")
    public Iterable<Todo> list() {
        return todoService.list();
    }

    /**
     * Crear un nuevo ToDo
     */
    @PostMapping(value = "api/todo")
    public Todo save(@RequestBody Todo todo) {
        return todoService.save(todo);
    }

    /**
     *  actualizar ToDo por medio de su ID
     * @param todo del tipo ToDo
     * @return ToDo actualizado o en caso de no encontrar el ID una excepcion
     */

    @PutMapping(value = "api/todo")
    public Todo update(@RequestBody Todo todo) {
        if (todo.getId() != null) {
            return todoService.save(todo);
        }
        throw new RuntimeException("No existe el ToDo");
    }

    /**
     * Borrado de un ToDo por medio de su ID
     * @param id de tipo Long
     */
    @DeleteMapping(value = "api/{id}/todo")
    public void delete(@PathVariable("id") Long id) {
        todoService.delete(id);
    }

    /**
     *
     * @param id de tipo Long
     * @return un ToDo por medio de su ID
     */
    @GetMapping(value = "api/{id}/todo")
    public Todo get(@PathVariable("id") Long id) {
        return todoService.get(id);
    }

}
