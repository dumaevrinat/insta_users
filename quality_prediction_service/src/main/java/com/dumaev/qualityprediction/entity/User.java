package com.dumaev.qualityprediction.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class User {
    private Boolean isN;
    private Double probability;

    private String username;
    private Integer id;
    private String bio;
    private String fullName;

    private Boolean hasMedia;
    private Boolean isBusinessAccount;
    private Boolean isJoinedRecently;

    private Integer followedByCount;
    private Integer followCount;
    private Integer felixVideoCount;
    private Integer mediaCount;
    private Integer highlightReelCount;

    private List<Media> mediaList;
}
