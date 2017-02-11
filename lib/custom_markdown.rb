# Custom Markdown Renderer. Used to add extra classes, etc. to 
# HTML generated from markdown.

require "middleman-core/renderers/redcarpet"
class CustomMarkdown < Middleman::Renderers::MiddlemanRedcarpetHTML

  # Add .table class to markdown tables for Bambora UI styling
  def table(header, body)
  "<div class='table-wrap'>" \
    "<table class='table'>" \
      "<thead>#{header}</thead>" \
      "<tbody>#{body}</tbody>" \
    "</table>" \
    "</div>"
  end

end