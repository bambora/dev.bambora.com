# Markdown
set :markdown_engine, :redcarpet
set :markdown,
    fenced_code_blocks: true,
    smartypants: true,
    disable_indented_code_blocks: true,
    prettify: true,
    tables: true,
    with_toc_data: true,
    no_intra_emphasis: true

# Assets
set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'
set :fonts_dir, 'fonts'

# Activate the syntax highlighter
activate :syntax

activate :autoprefixer do |config|
  config.browsers = ['last 2 version', 'Firefox ESR']
  config.cascade  = false
  config.inline   = true
end

# Active middleman-search
activate :search do |search|
  search.language = 'es'
  search.resources = ['portal/']
  search.fields = {
    title:   {boost: 100, store: true, required: true},
    content: {boost: 50},
    url:     {index: false, store: true}
  }
end

# Activate asset hash and enable for .json (search index)
# activate :asset_hash do |asset_hash| 
#   asset_hash.exts << '.json'
# end

# Helpers 
helpers do 
  
  # Display svg images inline
  def svg(name) 
    root = Middleman::Application.root
    file_path = "#{root}/source/images/svg/#{name}.svg"
    return File.read(file_path) if File.exists?(file_path)
    '(not found)'
  end

  # Return random color for card icon. 
  # Names must exist in Bamora UI.
  def get_random_icon_color()
    ['green-light', 'raspberry', 'tabriz-blue', 
      'green-powder', 'factory-yellow'].sample
  end
end

# Github pages require relative links
activate :relative_assets
set :relative_links, true

# Build Configuration
configure :build do
  activate :minify_css
  activate :minify_javascript
  # activate :relative_assets
  # activate :asset_hash
  # activate :gzip
end