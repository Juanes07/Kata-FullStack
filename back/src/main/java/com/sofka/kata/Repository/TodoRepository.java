package com.sofka.kata.Repository;

import com.sofka.kata.Model.Todo;
import org.springframework.data.repository.CrudRepository;

public interface TodoRepository extends CrudRepository<Todo, Long> {
}
