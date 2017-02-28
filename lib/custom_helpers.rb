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
    require 'fileutils'
    root = Middleman::Application.root
    name = url.split('/').last
    name, extension = name.split('.')
    download = open(url)
    FileUtils.mkdir_p(File.dirname("#{root}/data/autodownload/#{destination}"))
    IO.copy_stream(download, "#{root}/data/autodownload/#{destination}")
  end

  # Get the data file referenced using dot notation 
  # from the front matter of a page. 
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

  # Like titleize(), but better because it will keep all caps words in 
  # the name, e.g. test_API will become Test API (not Test Api).
  def breadcrumb_titleize(name)
    File.basename(name, '.html').gsub(/_/, ' ').split.map{|x| x.slice(0,1).capitalize + x.slice(1..-1)}.join(' ')
  end


  # Build div of breadcrumbs from get_breadcrumbs. Not great to define HTML 
  # inline like this but needed at build time when creating the search index.  
  def format_breadcrumb_trail(breadcrumbs, div_class: '')
    result = "<div class='#{div_class}'>"
    breadcrumbs.each_with_index do |(link, name), index| 
      if index != breadcrumbs.length - 1 
        result += "<span><a href='#{link}'>#{breadcrumb_titleize name}</a></span>"
        result += "<span class='chevron'> / </span>"
      else 
        result += "<span class='this-page'>#{breadcrumb_titleize name}</span>"
      end
    end
    result += "</div>"
  end


  def get_swagger_operations_by_tag(paths)
    result = {}
    paths.each do |path| 
      if path[0].start_with?('/') # swagger path item object
        path_name = path[0]
        operations = path[1]

        operations.each do |operation| 
          operation_name = operation[0]
          operation_body = operation[1]

          if ['get', 'put', 'post', 'delete', 
              'options', 'head', 'path'].include? operation_name
            # ( else an external ref or list of parameters, 
            #   not currently handled. )
            if operation_body.has_key? "tags"
              tags = operation_body.tags

              result_object = {}
              result_object["path_name"] = path_name
              result_object["operation_name"] = operation_name
              result_object["operation_body"] = operation_body

              tags.each do |tag| 
                if result.has_key? tag
                  result[tag] << result_object
                else 
                  result[tag] = [result_object]
                end  
              end
            end
          end
        end
      end
    end
    return result
  end

  # Return the hash of the latest git commit. Included on each page as 
  # the site version.
  def get_latest_commit()
    `git log -1 HEAD --format=%H`
  end

end