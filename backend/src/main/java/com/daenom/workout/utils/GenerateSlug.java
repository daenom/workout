package com.daenom.workout.utils;

public class GenerateSlug {
    public static String generateSlug(String name) {
        if (name == null || name.isEmpty()) {
            return "";
        }
        // Convert to lowercase
        String slug = name.toLowerCase();
        // Replace spaces and special characters with hyphens
        slug = slug.replaceAll("[^a-z0-9]+", "-");
        // Remove leading and trailing hyphens
        slug = slug.replaceAll("^-+|-+$", "");
        return slug;
    }
}
