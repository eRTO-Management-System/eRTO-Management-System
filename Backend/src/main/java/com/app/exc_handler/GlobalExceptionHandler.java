package com.app.exc_handler;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.app.custom_exception.UserHandlingException;
import com.app.dto.ErrorResponse;
import com.app.dto.ResponseDTO;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    // Handle @Valid validation errors
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {

        StringBuilder sb = new StringBuilder("Validation errors: ");
        ex.getBindingResult().getFieldErrors()
          .forEach(err -> sb.append(err.getField()).append(": ").append(err.getDefaultMessage()).append("; "));

        ErrorResponse error = new ErrorResponse("Validation Failed", sb.toString());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    // Handle custom UserHandlingException
    @ExceptionHandler(UserHandlingException.class)
    public ResponseEntity<ErrorResponse> handleUserHandlingException(UserHandlingException e) {
        ErrorResponse error = new ErrorResponse("User Error", e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    // Catch-all for unhandled runtime exceptions
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ResponseDTO<Object>> handleRuntimeException(RuntimeException e) {
        ResponseDTO<Object> response = new ResponseDTO<>(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Server Error: " + e.getMessage(),
                null
        );
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
