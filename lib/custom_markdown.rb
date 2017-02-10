# Custom Markdown Renderer 

require "middleman-core/renderers/redcarpet"
class CustomMarkdown < Middleman::Renderers::MiddlemanRedcarpetHTML

  # Add .table class to markdown tables for Bambora UI styling
  def table(header, body)
  "<table class='table'>" \
    "<thead>#{header}</thead>" \
    "<tbody>#{body}</tbody>" \
  "</table>"
  end

end