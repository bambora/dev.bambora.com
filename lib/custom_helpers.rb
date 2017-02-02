module CustomHelpers 

  # Display svg images inline
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

  def github_edit_link(source_file)
    path = source_file.split('/source/', 2)[1]
    "#{github_repo_url}/edit/#{github_branch}/source/#{path}"
  end

  def github_edit_include_link(partial)
    "#{github_repo_url}/edit/#{github_branch}/source/includes/#{partial}.md"
  end

  # Returns the html for a param type for use in the 
  # parameters table in the swagger template.
  # TODO: Clean up, move back into erb file.  
  def get_swagger_param_type_html(path, op, param)
    if param.key?("schema")
      # Param has a schema object definition
      if param.schema.key?("type")
        # Param is a collection of objects 
        schema = param.schema.items.to_h["$ref"].to_s.split('/').last 
        link_text = param.schema.type + " of " + schema
      else
        # Param is just a single object 
        schema = param.schema.to_h["$ref"].to_s.split('/').last 
        link_text = schema
      end
      "<a class='schema-link' id='#{path}-#{op}-#{schema}-link' href='#'>" + link_text + "</a>" 
    else
      # Param is a 'regular' type 
      if param.type == "array" 
        "array of " + param.items.type 
      else 
        param.type 
      end
    end
  end

  def get_breadcrumbs(path)
    paths = path.split('/')
    paths.pop
    paths
  end

end