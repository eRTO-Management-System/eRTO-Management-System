package com.erto.dto;

import org.springframework.http.HttpStatus;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class ResponseDTO<T> implements Serializable {
    private static final long serialVersionUID = 1L;

    private final HttpStatus status;
    private final String message;
    private final T result;
}
