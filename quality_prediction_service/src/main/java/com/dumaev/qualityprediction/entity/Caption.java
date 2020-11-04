package com.dumaev.qualityprediction.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Getter
@Setter
public class Caption {
    private String text;

    public List<String> getHashtags() {
        String regex = "#\\w+";

        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(text);

        List<String> hashtags = new ArrayList<>();

        while (matcher.find()) {
            hashtags.add(matcher.group());
        }

        return hashtags;
    }

    public int getLength() {
        return text.length();
    }
}
