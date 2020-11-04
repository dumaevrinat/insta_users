package com.dumaev.qualityprediction.model;

import lombok.Getter;
import org.deeplearning4j.nn.modelimport.keras.KerasModelImport;
import org.deeplearning4j.nn.modelimport.keras.exceptions.InvalidKerasConfigurationException;
import org.deeplearning4j.nn.modelimport.keras.exceptions.UnsupportedKerasConfigurationException;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Getter
public class QualityPredictionModel {

    private final MultiLayerNetwork model;

    @Autowired
    public QualityPredictionModel(@Value("${model.path}") String modelPath) throws IOException, InvalidKerasConfigurationException, UnsupportedKerasConfigurationException {
        String modelH5Filename = new ClassPathResource(modelPath).getFile().getPath();

        this.model = KerasModelImport.importKerasSequentialModelAndWeights(modelH5Filename);
    }

    public int[] predict(INDArray features) {
        return model.predict(features);
    }
}
