package com.dumaev.qualityprediction.entity;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.nd4j.linalg.factory.Nd4j;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class UserFeatures {
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

    public UserFeatures(User user) {
        this.bioLength = (double) user.getBio().length();
        this.fullNameLength = (double) user.getFullName().length();
        this.hasMedia = user.getHasMedia() ? 1.0 : 0.0;
        this.isBusinessAccount = user.getIsBusinessAccount() ? 1.0 : 0.0;
        this.isJoinedRecently = user.getIsJoinedRecently() ? 1.0 : 0.0;
        this.followedByCount = (double) user.getFollowedByCount();
        this.followCount = (double) user.getFollowCount();
        this.felixVideoCount = (double) user.getFelixVideoCount();
        this.mediaCount = (double) user.getMediaCount();
        this.highlightReelCount = (double) user.getHighlightReelCount();

        List<Integer> captionLengthList = new ArrayList<>();
        List<Integer> captionHashtagList = new ArrayList<>();
        List<Integer> likesCountList = new ArrayList<>();
        List<Integer> commentCountList = new ArrayList<>();
        List<Integer> taggedUsersCountList = new ArrayList<>();

        user.getMediaList().forEach(media -> {
            Caption caption = media.getCaption();

            captionLengthList.add(caption.getLength());
            captionHashtagList.add(caption.getHashtags().size());
            likesCountList.add(media.getLikesCount());
            commentCountList.add(media.getCommentsCount());
            taggedUsersCountList.add(media.getTaggedUsersCount());
        });

        this.captionLengthDescription = new StatisticalDescription(Nd4j.create(captionLengthList));
        this.captionHashtagDescription = new StatisticalDescription(Nd4j.create(captionHashtagList));
        this.likesCountDescription = new StatisticalDescription(Nd4j.create(likesCountList));
        this.commentCountDescription = new StatisticalDescription(Nd4j.create(commentCountList));
        this.taggedUsersDescription = new StatisticalDescription(Nd4j.create(taggedUsersCountList));

        this.followCountDBFollowedByCount = (double) user.getFollowCount() / user.getFollowedByCount();
        this.followedByCountDBFollowCount = (double) user.getFollowedByCount() / user.getFollowCount();

        if (Double.isNaN(this.followCountDBFollowedByCount) || Double.isInfinite(this.followCountDBFollowedByCount)) {
            this.followCountDBFollowedByCount = 0.0;
        }

        if (Double.isNaN(this.followedByCountDBFollowCount) || Double.isInfinite(this.followedByCountDBFollowCount)) {
            this.followedByCountDBFollowCount = 0.0;
        }

    }

    public List<Double> getFeatures() {
        List<Double> featureList = new ArrayList<>();

        Field[] fields = this.getClass().getDeclaredFields();

        for (Field f : fields) {
            try {
                if (f.getType() == Double.class) {
                    featureList.add((Double) f.get(this));
                }

                if (f.getType() == StatisticalDescription.class) {
                    StatisticalDescription description = (StatisticalDescription) f.get(this);

                    featureList.add(description.getMean());
                    featureList.add(description.getStd());
                    featureList.add(description.getMax());
                    featureList.add(description.getMin());
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }

        return featureList;
    }
}
