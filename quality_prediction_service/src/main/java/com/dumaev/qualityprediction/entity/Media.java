package com.dumaev.qualityprediction.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Media {
    private Caption caption;
    private Integer likesCount;
    private Integer commentsCount;
    private Integer taggedUsersCount;
}
