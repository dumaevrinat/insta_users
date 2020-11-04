package com.dumaev.qualityprediction.api.v1.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

//    @ExceptionHandler(.class)
//    protected ResponseEntity<Exception> handleNoSuchNotebookException() {
//        return new ResponseEntity<>(new Exception(400, "No such notebook"), HttpStatus.BAD_REQUEST);
//    }

//    @NonNull
//    @Override
//    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, @NonNull HttpHeaders headers, @NonNull HttpStatus status, @NonNull WebRequest request) {
//        Map<String, String> errors = new HashMap<>();
//
//        ex.getBindingResult().getAllErrors().forEach((error) -> {
//            String fieldName = ((FieldError) error).getField();
//            String errorMessage = error.getDefaultMessage();
//            errors.put(fieldName, errorMessage);
//        });
//        return new ResponseEntity<> (errors, HttpStatus.BAD_REQUEST);
//    }


    @Data
    @AllArgsConstructor
    private static class Exception {
        private int code;
        private String message;
    }
}
