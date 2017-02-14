module CustomHelpers 

  # Display svg images inline
  # optionally pass a string to use as the html class(es)
  def svg(name, classes: [])
    root = Middleman::Application.root
    file_path = "#{root}/source/images/svg/#{name}.svg"
    if File.exists?(file_path)
      f = File.read(file_path)
      if classes.any? 
        return f.gsub('<svg ', "<svg class='#{classes.join(' ')}'")
      else
        return f
      end
    else
      return '(not found)'
    end
  end

  # Return random color for card icon. 
  # Names must exist in Bamora UI as classes.
  def get_random_icon_color()
    ['green-light', 'raspberry', 'tabriz-blue', 
      'green-powder', 'factory-yellow'].sample
  end

  # Returns href to edit page on gitub
  def github_edit_link(source_file)
    path = source_file.split('/source/', 2)[1]
    "#{github_repo_url}/edit/#{github_branch}/source/#{path}"
  end

  # Returns href to edit partial on github 
  def github_edit_include_link(partial)
    path, _, file = partial.rpartition('/')    
    "#{github_repo_url}/edit/#{github_branch}/source/includes/#{path}/_#{file}.md"
  end

  # Returns a hash of href links and display names for
  # the pages in the paths breadcrumb path
  def get_breadcrumbs(path)
    result = {}
    path_list = path.split('/')
    if path_list.last == "index.html"
      path_list = path_list[0...-1] # Don't include current page (index.html) or directory/
    else
        path_list = path_list[0...-1] << File.basename(path_list.last, '.html')  
  end
    path_list.each_with_index do |path, index|
      link = "/" + path_list[0..index].join('/') + '/'
      result[link] = path
    end
    result
  end

  # Render markdown text to html tags 
  def render_markdown(md)
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML)
    markdown.render(md)
  end

  # Return the current page path in the form required for 
  # the side nav toc. 
  def get_page_path(current_page)
    "/" + current_page.path.split('.').first + "/"
  end

  # Downloads the specified swagger file at build time 
  # Can then refer to the destination file name in a 
  # swagger template to render the spec.  
  def get_swagger_doc(url, destination)
    require 'open-uri'
    root = Middleman::Application.root
    name = url.split('/').last
    name, extension = name.split('.')
    download = open(url)
    IO.copy_stream(download, "#{root}/data/#{destination}")
  end


  def get_data_from_frontmatter(path) 
    path = path.split('.')
    result = data
    path.each do |p|
      result = result["#{p}"]
    end
    result   
  end 

  # Nicely format a string for use as a html id or other attribute.
  def make_html_safe(str) 
    str.gsub(/[^-\p{Alnum}]/, '')
  end 
end