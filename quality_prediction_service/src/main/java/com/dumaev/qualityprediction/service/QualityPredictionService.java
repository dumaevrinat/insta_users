package com.dumaev.qualityprediction.service;

import com.dumaev.qualityprediction.entity.UserFeatures;
import com.dumaev.qualityprediction.model.QualityPredictionModel;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.nd4j.linalg.factory.Nd4j;
import org.springframework.stereotype.Service;

@Service
public class QualityPredictionService {

    private final QualityPredictionModel model;

    public QualityPredictionService(QualityPredictionModel model) {
        this.model = model;
    }

    public double predict(UserFeatures userFeatures) {
        INDArray features = Nd4j.create(userFeatures.getFeatures());
        features = features.reshape(1, features.length());

        System.out.println(userFeatures.getFeatures());

        return model.getModel().output(features).getDouble(0);
    }
}
