total_js = ""
File.open("manifesto").each_line do |x|
  total_js = total_js + "\n" + File.open(x.strip).read
end
File.open("app.js", "w").write(total_js)