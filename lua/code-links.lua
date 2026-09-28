local cb_id = 0

local function trim_punctuation(url)
  local trailing = ""
  while #url > 0 do
    local c = url:sub(-1)
    if c == "." or c == "," or c == ";" or c == ":" or c == "!" then
      trailing = c .. trailing
      url = url:sub(1, -2)
    else
      break
    end
  end

  return url, trailing
end

local function linkify_str(text)
  return (text:gsub("https?://[^%s<]+", function(url)
    local core, trailing = trim_punctuation(url)
    return '<a href="' .. core .. '">' ..  core ..  '</a>' ..  trailing
  end))
end

local function linkify_html(html)
  local out = {}
  local pos = 1

  while true do
    local start, end_ = html:find("<[^>]*>", pos)
    if not start then
      out[#out + 1] = html:sub(pos)
      break
    end

    if start > pos then
      out[#out + 1] = linkify_str(html:sub(pos, start - 1))
    end

    out[#out + 1] = html:sub(start, end_):gsub(" ?sourceCode ?", ""):gsub(' ?class=""', "")
    pos = end_ + 1
  end

  return table.concat(out)
end

function CodeBlock(block)
  local opts = pandoc.WriterOptions(PANDOC_WRITER_OPTIONS)
  opts.template = pandoc.template.compile("$body$")
  if block.identifier == "" then
    cb_id = cb_id + 1
    block.identifier = "cb" .. cb_id
  end

  local html = pandoc.write(pandoc.Pandoc { block }, "html5", opts)
  html = linkify_html(html)
  return pandoc.RawBlock("html", html)
end
