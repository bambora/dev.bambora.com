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
  search.language = 'es' # TODO: Fix
  search.resources = ['portal/']
  search.fields = {
    title:   {boost: 100, store: true, required: true},
    content: {boost: 50},
    url:     {index: false, store: true},
    summary: {boost: 25, store: true}
  }
end

# Activate asset hash and enable for .json (search index)
# activate :asset_hash do |asset_hash| 
#   asset_hash.exts << '.json'
# end

# Github variables 
set :github_repo_url, "https://github.com/bambora/dev.bambora.com"
set :github_branch, "v2"

# Helpers 
# TODO: Move these into their own file. 
helpers do 
  
  # Display svg images inline
  def svg(name) 
    root = Middleman::Application.root
    file_path = "#{root}/source/images/svg/#{name}.svg"
    return File.read(file_path) if File.exists?(file_path)
    '(not found)'
  end

  # Return random color for card icon. 
  # Names must exist in Bamora UI as classes.
  def get_random_icon_color()
    ['green-light', 'raspberry', 'tabriz-blue', 
      'green-powder', 'factory-yellow'].sample
  end

  def github_edit_link(source_file)
    path = source_file.split('/source/', 2)[1]
    "#{github_repo_url}/edit/#{github_branch}/source/#{path}"
  end

  def github_edit_include_link(partial)
    "#{github_repo_url}/edit/#{github_branch}/source/includes/#{partial}.md"
  end

  def get_swagger_param_type_html(param)
    if param.key?("schema")
      # Param has a schema object definition
      if param.schema.key?("type") 
        # Param is a collection of objects 
        schema = param.schema.items.to_h["$ref"].to_s.split('/').last 
        return "<a class='schema-link' id='#{schema}-link' href='#'>" + param.schema.type + " of " + schema + "</a>"
      else 
        # Param is just a single object 
        schema = param.schema.to_h["$ref"].to_s.split('/').last 
        return "<a class='schema-link' id='#{schema}-link' href='#'>" + schema + "</a>" 
      end
    else
      # Param is a 'regular' type 
      if param.type == "array" 
        return "array of " + param.items.type 
      else 
        return param.type 
      end
    end
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
  
  set :http_prefix, '/dev.na.bambora.com'
end