package com.dumaev.qualityprediction.entity;

import lombok.Getter;
import lombok.Setter;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.nd4j.linalg.factory.Nd4j;


@Getter
@Setter
public class StatisticalDescription {
    private Double mean;
    private Double std;
    private Double max;
    private Double min;

    public StatisticalDescription(INDArray array) {
        this.mean = Nd4j.mean(array).getDouble(0);
        this.std = Nd4j.std(array).getDouble(0);
        this.max = Nd4j.max(array).getDouble(0);
        this.min = Nd4j.min(array).getDouble(0);
    }
}
