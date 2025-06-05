// This is a mock service that simulates generating a WordPress plugin
// In a real application, this would connect to an AI service API

export const generatePlugin = async (pluginData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate a slug from the title
  const slug = pluginData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  // Generate features based on plugin type and description
  const features = generateFeatures(pluginData);
  
  // Generate main plugin file
  const mainFile = generateMainPluginFile(pluginData, slug);
  
  // Generate additional files if needed
  const additionalFiles = generateAdditionalFiles(pluginData, slug);
  
  // Generate usage instructions
  const instructions = generateInstructions(pluginData, slug);
  
  return {
    name: pluginData.title,
    slug,
    type: pluginData.type,
    description: pluginData.description,
    features,
    mainFile,
    additionalFiles,
    instructions,
    templateId: pluginData.templateId || null
  };
};

function generateFeatures(pluginData) {
  const baseFeatures = [
    "Easy installation and activation",
    "Compatible with WordPress 5.0 and above",
    "Lightweight and optimized for performance"
  ];
  
  const typeSpecificFeatures = {
    widget: [
      "Customizable widget title and settings",
      "Responsive design that works on all devices",
      "Easy to add to any widget area"
    ],
    shortcode: [
      "Simple shortcode implementation",
      "Customizable through shortcode attributes",
      "Can be used in posts, pages, and widgets"
    ],
    admin: [
      "Clean integration with WordPress admin interface",
      "User-friendly settings page",
      "Role-based access control"
    ],
    content: [
      "Seamless content enhancement",
      "Customizable display options",
      "Works with any theme"
    ],
    custom: [
      "Custom functionality tailored to your needs",
      "Extensible and developer-friendly",
      "Well-documented code"
    ],
    ecommerce: [
      "Seamless WooCommerce integration",
      "Enhanced product display features",
      "Optimized for e-commerce performance"
    ]
  };
  
  return [...baseFeatures, ...typeSpecificFeatures[pluginData.type] || []];
}

function generateMainPluginFile(pluginData, slug) {
  const className = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('_');
  
  let template = `<?php
/**
 * Plugin Name: ${pluginData.title}
 * Description: ${pluginData.description}
 * Version: 1.0.0
 * Author: PluginGenius
 * Author URI: https://plugingenius.com
 * Text Domain: ${slug}
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class ${className} {
    /**
     * Constructor
     */
    public function __construct() {
        // Plugin initialization
        add_action('plugins_loaded', array($this, 'init'));
    }

    /**
     * Initialize the plugin
     */
    public function init() {
        // Load text domain for internationalization
        load_plugin_textdomain('${slug}', false, dirname(plugin_basename(__FILE__)) . '/languages');
`;

  // Add type-specific code
  switch (pluginData.type) {
    case 'widget':
      template += `
        // Register widget
        add_action('widgets_init', array($this, 'register_widget'));
    }

    /**
     * Register the widget
     */
    public function register_widget() {
        require_once plugin_dir_path(__FILE__) . 'includes/class-${slug}-widget.php';
        register_widget('${className}_Widget');
    }
`;
      break;
      
    case 'shortcode':
      template += `
        // Register shortcode
        add_shortcode('${slug}', array($this, 'shortcode_callback'));
    }

    /**
     * Shortcode callback function
     */
    public function shortcode_callback($atts, $content = null) {
        // Default attributes
        $atts = shortcode_atts(array(
            'title' => '',
        ), $atts, '${slug}');

        // Start output buffering
        ob_start();
        
        // Include template
        include plugin_dir_path(__FILE__) . 'templates/shortcode-template.php';
        
        // Return the buffered content
        return ob_get_clean();
    }
`;
      break;
      
    case 'admin':
      template += `
        // Add admin menu
        add_action('admin_menu', array($this, 'add_admin_menu'));
        
        // Register settings
        add_action('admin_init', array($this, 'register_settings'));
    }

    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_options_page(
            '${pluginData.title}',
            '${pluginData.title}',
            'manage_options',
            '${slug}',
            array($this, 'display_settings_page')
        );
    }

    /**
     * Register settings
     */
    public function register_settings() {
        register_setting('${slug}_options', '${slug}_options');
        
        add_settings_section(
            '${slug}_section',
            __('Settings', '${slug}'),
            array($this, 'settings_section_callback'),
            '${slug}'
        );
        
        add_settings_field(
            '${slug}_field',
            __('Option', '${slug}'),
            array($this, 'settings_field_callback'),
            '${slug}',
            '${slug}_section'
        );
    }

    /**
     * Settings section callback
     */
    public function settings_section_callback() {
        echo __('Configure your plugin settings below:', '${slug}');
    }

    /**
     * Settings field callback
     */
    public function settings_field_callback() {
        $options = get_option('${slug}_options');
        $value = isset($options['field']) ? $options['field'] : '';
        echo '<input type="text" name="${slug}_options[field]" value="' . esc_attr($value) . '" />';
    }

    /**
     * Display settings page
     */
    public function display_settings_page() {
        // Check user capabilities
        if (!current_user_can('manage_options')) {
            return;
        }
        
        // Include admin template
        include plugin_dir_path(__FILE__) . 'admin/settings-page.php';
    }
`;
      break;
      
    case 'content':
      template += `
        // Add content filter
        add_filter('the_content', array($this, 'filter_content'));
    }

    /**
     * Filter content
     */
    public function filter_content($content) {
        // Only modify single post content
        if (!is_singular('post')) {
            return $content;
        }
        
        // Add content before
        $before = '<div class="${slug}-before">' . __('Content before the post', '${slug}') . '</div>';
        
        // Add content after
        $after = '<div class="${slug}-after">' . __('Content after the post', '${slug}') . '</div>';
        
        // Return modified content
        return $before . $content . $after;
    }
`;
      break;
      
    case 'ecommerce':
      template += `
        // Check if WooCommerce is active
        if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
            // Add WooCommerce hooks
            add_action('woocommerce_before_single_product', array($this, 'before_product'));
            add_action('woocommerce_after_single_product', array($this, 'after_product'));
            add_filter('woocommerce_product_get_image', array($this, 'enhance_product_image'), 10, 2);
        }
    }

    /**
     * Before product hook
     */
    public function before_product() {
        // Add custom content before product
        echo '<div class="${slug}-before-product">';
        // Your custom content here
        echo '</div>';
    }

    /**
     * After product hook
     */
    public function after_product() {
        // Add custom content after product
        echo '<div class="${slug}-after-product">';
        // Your custom content here
        echo '</div>';
    }

    /**
     * Enhance product image
     */
    public function enhance_product_image($image, $product) {
        // Wrap the image in a custom container with data attributes for JS enhancement
        return '<div class="${slug}-enhanced-gallery" data-product-id="' . esc_attr($product->get_id()) . '">' . $image . '</div>';
    }
`;
      break;
      
    case 'custom':
    default:
      template += `
        // Add custom functionality
        add_action('init', array($this, 'custom_functionality'));
    }

    /**
     * Custom functionality
     */
    public function custom_functionality() {
        // Your custom code here
    }
`;
      break;
  }

  // Close the class and initialize
  template += `}

// Initialize the plugin
$${slug}_plugin = new ${className}();
`;

  return template;
}

function generateAdditionalFiles(pluginData, slug) {
  const additionalFiles = {};
  const className = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('_');
  
  switch (pluginData.type) {
    case 'widget':
      additionalFiles[`includes/class-${slug}-widget.php`] = `<?php
/**
 * ${pluginData.title} Widget
 */
class ${className}_Widget extends WP_Widget {
    /**
     * Constructor
     */
    public function __construct() {
        parent::__construct(
            '${slug}_widget',
            __('${pluginData.title}', '${slug}'),
            array(
                'description' => __('${pluginData.description}', '${slug}')
            )
        );
    }

    /**
     * Widget frontend display
     */
    public function widget($args, $instance) {
        echo $args['before_widget'];
        
        if (!empty($instance['title'])) {
            echo $args['before_title'] . apply_filters('widget_title', $instance['title']) . $args['after_title'];
        }
        
        // Widget content
        echo '<div class="${slug}-widget-content">';
        echo __('Widget content goes here', '${slug}');
        echo '</div>';
        
        echo $args['after_widget'];
    }

    /**
     * Widget backend form
     */
    public function form($instance) {
        $title = !empty($instance['title']) ? $instance['title'] : __('New title', '${slug}');
        ?>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('title')); ?>"><?php esc_attr_e('Title:', '${slug}'); ?></label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('title')); ?>" name="<?php echo esc_attr($this->get_field_name('title')); ?>" type="text" value="<?php echo esc_attr($title); ?>">
        </p>
        <?php
    }

    /**
     * Widget update
     */
    public function update($new_instance, $old_instance) {
        $instance = array();
        $instance['title'] = (!empty($new_instance['title'])) ? sanitize_text_field($new_instance['title']) : '';
        return $instance;
    }
}`;
      break;
      
    case 'shortcode':
      additionalFiles[`templates/shortcode-template.php`] = `<?php
/**
 * Shortcode template for ${pluginData.title}
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="${slug}-shortcode">
    <?php if (!empty($atts['title'])) : ?>
        <h3 class="${slug}-title"><?php echo esc_html($atts['title']); ?></h3>
    <?php endif; ?>
    
    <div class="${slug}-content">
        <?php if (!empty($content)) : ?>
            <?php echo wp_kses_post($content); ?>
        <?php else : ?>
            <p><?php _e('Default shortcode content', '${slug}'); ?></p>
        <?php endif; ?>
    </div>
</div>`;
      break;
      
    case 'admin':
      additionalFiles[`admin/settings-page.php`] = `<?php
/**
 * Admin settings page for ${pluginData.title}
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap">
    <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
    
    <form method="post" action="options.php">
        <?php
        // Output security fields
        settings_fields('${slug}_options');
        
        // Output setting sections
        do_settings_sections('${slug}');
        
        // Submit button
        submit_button();
        ?>
    </form>
</div>`;
      break;
      
    case 'content':
      additionalFiles[`assets/css/${slug}-style.css`] = `.${slug}-before {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f8f9fa;
    border-left: 4px solid #4f46e5;
}

.${slug}-after {
    margin-top: 20px;
    padding: 15px;
    background-color: #f8f9fa;
    border-left: 4px solid #4f46e5;
}`;
      break;
      
    case 'ecommerce':
      additionalFiles[`assets/js/${slug}-gallery.js`] = `/**
 * ${pluginData.title} - Enhanced Product Gallery
 */
(function($) {
    'use strict';
    
    // Initialize when document is ready
    $(document).ready(function() {
        // Find all enhanced galleries
        $('.${slug}-enhanced-gallery').each(function() {
            initEnhancedGallery($(this));
        });
    });
    
    /**
     * Initialize enhanced gallery
     */
    function initEnhancedGallery($gallery) {
        const productId = $gallery.data('product-id');
        
        // Add zoom functionality
        $gallery.find('img').addClass('${slug}-zoomable').on('mousemove', function(e) {
            const $img = $(this);
            const offset = $img.offset();
            const x = e.pageX - offset.left;
            const y = e.pageY - offset.top;
            const imgWidth = $img.width();
            const imgHeight = $img.height();
            
            // Calculate zoom position
            const xPercent = x / imgWidth * 100;
            const yPercent = y / imgHeight * 100;
            
            // Apply zoom effect
            $img.css('transform-origin', xPercent + '% ' + yPercent + '%')
                .css('transform', 'scale(1.5)');
        }).on('mouseleave', function() {
            // Reset zoom
            $(this).css('transform', 'scale(1)');
        });
        
        // Add lightbox functionality
        $gallery.find('img').on('click', function(e) {
            e.preventDefault();
            
            // Create lightbox
            const $lightbox = $('<div class="${slug}-lightbox"></div>');
            const $lightboxContent = $('<div class="${slug}-lightbox-content"></div>');
            const $lightboxClose = $('<button class="${slug}-lightbox-close">&times;</button>');
            const $lightboxImg = $('<img src="' + $(this).attr('src') + '" alt="' + $(this).attr('alt') + '">');
            
            // Add to DOM
            $lightboxContent.append($lightboxImg);
            $lightbox.append($lightboxContent).append($lightboxClose);
            $('body').append($lightbox);
            
            // Show lightbox
            setTimeout(function() {
                $lightbox.addClass('active');
            }, 10);
            
            // Close lightbox on click
            $lightbox.on('click', function() {
                $lightbox.removeClass('active');
                setTimeout(function() {
                    $lightbox.remove();
                }, 300);
            });
        });
    }
})(jQuery);`;

      additionalFiles[`assets/css/${slug}-gallery.css`] = `.${slug}-enhanced-gallery {
    position: relative;
    overflow: hidden;
}

.${slug}-zoomable {
    transition: transform 0.3s ease;
    cursor: zoom-in;
}

.${slug}-lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.${slug}-lightbox.active {
    opacity: 1;
}

.${slug}-lightbox-content {
    max-width: 90%;
    max-height: 90%;
}

.${slug}-lightbox-content img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.${slug}-lightbox-close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 30px;
    color: white;
    background: transparent;
    border: none;
    cursor: pointer;
}`;
      break;
      
    case 'custom':
      additionalFiles[`includes/class-${slug}-functions.php`] = `<?php
/**
 * Custom functions for ${pluginData.title}
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class ${className}_Functions {
    /**
     * Initialize the class
     */
    public static function init() {
        // Add your custom functionality here
    }
    
    /**
     * Example function
     */
    public static function example_function() {
        // Example function implementation
        return true;
    }
}

// Initialize
${className}_Functions::init();`;
      break;
  }
  
  // Add readme.txt for all plugin types
  additionalFiles[`readme.txt`] = `=== ${pluginData.title} ===
Contributors: plugingenius
Tags: ${pluginData.type}, wordpress, plugin
Requires at least: 5.0
Tested up to: 6.2
Stable tag: 1.0.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

${pluginData.description}

== Description ==

${pluginData.description}

Features:

${generateFeatures(pluginData).map(feature => `* ${feature}`).join('\n')}

== Installation ==

1. Upload the plugin files to the \`/wp-content/plugins/${slug}\` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Use the plugin according to its type and functionality

== Frequently Asked Questions ==

= How do I use this plugin? =

Usage depends on the plugin type. Please see the instructions section for details.

== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif).

== Changelog ==

= 1.0.0 =
* Initial release

== Upgrade Notice ==

= 1.0.0 =
Initial release`;

  return additionalFiles;
}

function generateInstructions(pluginData, slug) {
  let instructions = '';
  
  switch (pluginData.type) {
    case 'widget':
      instructions = `
        <p>After activating the plugin, you can add the widget to any widget area:</p>
        <ol>
          <li>Go to <strong>Appearance → Widgets</strong> in your WordPress admin.</li>
          <li>Find the "${pluginData.title}" widget in the available widgets list.</li>
          <li>Drag it to your desired widget area (sidebar, footer, etc.).</li>
          <li>Configure the widget title and settings as needed.</li>
          <li>Click "Save".</li>
        </ol>
      `;
      break;
      
    case 'shortcode':
      instructions = `
        <p>Use the shortcode in any post or page:</p>
        <pre><code>[${slug} title="Your Title"]Your content here[/${slug}]</code></pre>
        <p>Available attributes:</p>
        <ul>
          <li><code>title</code> - Optional title for the shortcode output</li>
        </ul>
      `;
      break;
      
    case 'admin':
      instructions = `
        <p>After activating the plugin:</p>
        <ol>
          <li>Go to <strong>Settings → ${pluginData.title}</strong> in your WordPress admin.</li>
          <li>Configure the plugin settings according to your needs.</li>
          <li>Click "Save Changes".</li>
        </ol>
      `;
      break;
      
    case 'content':
      instructions = `
        <p>After activating the plugin:</p>
        <ol>
          <li>The plugin will automatically add content before and after your posts.</li>
          <li>This only applies to single post views.</li>
          <li>You can customize the appearance by editing the CSS in <code>assets/css/${slug}-style.css</code>.</li>
        </ol>
      `;
      break;
      
    case 'ecommerce':
      instructions = `
        <p>After activating the plugin:</p>
        <ol>
          <li>The plugin will automatically enhance your WooCommerce product galleries.</li>
          <li>Product images will have zoom functionality on hover.</li>
          <li>Clicking on product images will open them in a lightbox.</li>
          <li>You can customize the appearance by editing the CSS in <code>assets/css/${slug}-gallery.css</code>.</li>
        </ol>
      `;
      break;
      
    case 'custom':
    default:
      instructions = `
        <p>After activating the plugin:</p>
        <ol>
          <li>The plugin will automatically implement its functionality based on your requirements.</li>
          <li>Refer to the code documentation for specific details on how to use and customize the plugin.</li>
        </ol>
      `;
      break;
  }
  
  return instructions;
}
