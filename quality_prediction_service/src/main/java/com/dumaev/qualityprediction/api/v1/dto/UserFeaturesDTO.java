package com.dumaev.qualityprediction.api.v1.dto;

import com.dumaev.qualityprediction.entity.StatisticalDescription;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserFeaturesDTO {
    private Double isN;
    private Double bioLength;
    private Double fullNameLength;

    private Double hasMedia;
    private Double isBusinessAccount;
    private Double isJoinedRecently;

    private Double followedByCount;
    private Double followCount;
    private Double felixVideoCount;
    private Double mediaCount;
    private Double highlightReelCount;

    private StatisticalDescription captionLengthDescription;
    private StatisticalDescription captionHashtagDescription;
    private StatisticalDescription likesCountDescription;
    private StatisticalDescription commentCountDescription;
    private StatisticalDescription taggedUsersDescription;

    private Double followCountDBFollowedByCount;
    private Double followedByCountDBFollowCount;
}
