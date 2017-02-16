# Custom Markdown Renderer. Used to add extra classes, etc. to 
# HTML generated from markdown.

require "middleman-core/renderers/redcarpet"
class CustomMarkdown < Middleman::Renderers::MiddlemanRedcarpetHTML

  # Need to merge renderer options for redcarpet 
  # https://github.com/vmg/redcarpet#darling-i-packed-you-a-couple-renderers-for-lunch
  def initialize(options={})
    super options.merge(
      :prettify => true,
      :with_toc_data => true,
    )
  end

  # Add .table class to markdown tables for Bambora UI styling. 
  # Also wrap tables in div for responsive styling. 
  def table(header, body)
  "<div class='table-wrap'>" \
    "<table class='table'>" \
      "<thead>#{header}</thead>" \
      "<tbody>#{body}</tbody>" \
    "</table>" \
    "</div>"
  end

end