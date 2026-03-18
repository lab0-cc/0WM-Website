function Link(el)
  if el.target:match("^https?://") or el.target:match("^mailto:") or el.target:match("^#") then
    return el
  end

  local path, frag = el.target:match("^(.-)(#.*)$")
  if not path then
    path = el.target
    frag = ""
  end

  if path:match("%.md$") then
    el.target = path:gsub("%.md$", ".html") .. frag
  end

  return el
end
