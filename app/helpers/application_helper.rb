module ApplicationHelper
  # Renders a React component
  # 
  # @param component_name [String] The name of the React component (must be in components.jsx registry)
  # @param props [Hash] Props to pass to the component
  # @param html_options [Hash] Additional HTML attributes (class, id, etc.)
  # @return [String] HTML div tag with data attributes for React hydration
  #
  # Example:
  #   <%= react_component("Greeting", { name: "John" }, { class: "mt-4" }) %>
  def react_component(component_name, props = {}, html_options = {})
    html_options[:data] ||= {}
    html_options[:data][:react_component] = component_name
    html_options[:data][:props] = props.to_json
    
    content_tag(:div, "", html_options)
  end
end
