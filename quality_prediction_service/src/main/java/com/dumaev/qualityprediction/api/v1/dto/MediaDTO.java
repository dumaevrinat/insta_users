package com.dumaev.qualityprediction.api.v1.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
public class MediaDTO {
    @NotNull
    private CaptionDTO caption;
    @NotNull
    private Integer likesCount;
    @NotNull
    private Integer commentsCount;
    @NotNull
    private Integer taggedUsersCount;
}
