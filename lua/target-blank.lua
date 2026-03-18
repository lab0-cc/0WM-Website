function Link(el)
  if el.target:match("^https?://") then
    el.attributes.target = "_blank"
    el.attributes.rel = "noopener noreferrer"
  end

  return el
end
