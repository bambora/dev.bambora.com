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

# Activate directory style pretty urls 
activate :directory_indexes

activate :autoprefixer do |config|
  config.browsers = ['last 2 version', 'Firefox ESR']
  config.cascade  = false
  config.inline   = true
end

# Active middleman-search
activate :search do |search|
  search.language = 'es' # TODO: Bug workaround. Fix.
  #search.resources = ['portal/', 'includes/']
  search.resources = ['portal/']
  search.fields = {
    title:   {boost: 100, store: true, required: true},
    content: {boost: 50},
    url:     {index: false, store: true},
    summary: {boost: 25, store: true}
  }

  # Add 'includes' for each page to the index. 
  # TODO: Fix. Currently includes rendered html partials 
  # instead of plain text markdown. 
  search.before_index = Proc.new do |to_index, to_store, resource| 
    if resource.data.includes
      resource.data.includes.each do |include|
        to_index[:content] += partial("/includes/#{include}")
      end
    end
   end
end

# Activate asset hash and enable for .json (search index)
# activate :asset_hash do |asset_hash|
#   asset_hash.exts << '.json'
# end

# Github variables 
set :github_repo_url, "https://github.com/bambora/dev.bambora.com"
set :github_branch, "v2"

# Helpers 
require "lib/custom_helpers"
helpers CustomHelpers

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
  
  #set :http_prefix, '/dev.na.bambora.com'
end