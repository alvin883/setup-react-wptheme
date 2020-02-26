<?php

if (!is_admin()) add_action('wp_enqueue_scripts', 'theme_enqueue', 11);

function theme_enqueue() {
    // Remove WP jQuery
    // Reference: https://wordpress.stackexchange.com/a/189311
    wp_deregister_script('jquery');

    // Guttenberg Style
    // Reference: https://stackoverflow.com/a/52280110
    wp_dequeue_style( 'wp-block-library' );

    // Theme Scripts
    wp_register_script('theme-scripts', get_stylesheet_directory_uri() . '/frontend/dist/bundle.js', false, null, true);
    wp_enqueue_script('theme-scripts');

    // Theme Styles
    // wp_enqueue_style('theme-styles', get_stylesheet_directory_uri() . '/assets/css/dist/styles.min.css');
}