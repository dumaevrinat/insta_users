package com.dumaev.qualityprediction.api.v1.controller;

import com.dumaev.qualityprediction.api.v1.dto.Mapper;
import com.dumaev.qualityprediction.api.v1.dto.UserDTO;
import com.dumaev.qualityprediction.api.v1.dto.UserFeaturesDTO;
import com.dumaev.qualityprediction.entity.User;
import com.dumaev.qualityprediction.entity.UserFeatures;
import com.dumaev.qualityprediction.service.QualityPredictionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin()
@RequestMapping("/api/v1/user_quality")
public class QualityPredictionController {

    private final Mapper mapper;

    private final QualityPredictionService service;

    public QualityPredictionController(Mapper mapper, QualityPredictionService service) {
        this.mapper = mapper;
        this.service = service;
    }

    @GetMapping(value = "/predictByUserInfo")
    public ResponseEntity<Object> predictByUserInfo(@RequestBody @Valid UserDTO userDTO) {
        User user = mapper.convertToEntity(userDTO);
        UserFeatures userFeatures = new UserFeatures(user);

        double isN = service.predict(userFeatures);

        UserFeaturesDTO result = mapper.convertToDTO(userFeatures);
        result.setIsN(isN);

        return ResponseEntity.ok(result);
    }
}
