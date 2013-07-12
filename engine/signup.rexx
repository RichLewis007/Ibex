#!rexx

parse pull postdata

if postdata="" then signal oops

call procpost

thishost=getenv("HTTP_HOST")

if pos("hexibex.us",thishost)>0 then
  filedatadir="/kunden/homepages/20/d100701421/htdocs/hexibex/plugins/filedata/"
else
  filedatadir="/Users/jeff/Sites/ibex/filedata/"

race.0=4
race.1="Eye Guys"
race.2="Ophidians"
race.3="Teal Magi"
race.4="Purple Dragons"

say "Content-Type: text/html"
say

if length(post.dynasty)=0 | length(post.firstname)=0 then signal oops

say "<html>"
say "<head>"
say "<META HTTP-EQUIV=""refresh"" content=""3; URL=config.rexx/"||post.race||"/ibexconfig"">"
say "<title>Ibex Signup</title>"
say "<style>"
say "body {font-family:Verdana;background-color:black;color:white;}"
say ".ib {font-family:Verdana;font-size:9pt; font-weight:bold; background-color:#403040; color:#e0a0d0; border:solid 1px white;}"
say "</style>"
say "</head>"

say "<body>"
say "<h1>Ibex Signup</h1>"
therace=post.race

f="./players/"therace".player"
x=lineout(f,"[IbexPlayer]")
x=lineout(f,"player="therace)
x=lineout(f,"dynasty="post.dynasty)
x=lineout(f,"firstname="post.firstname)
x=lineout(f,"title="post.title)

/* --- */
f=filedatadir||"signups"
f2=f||"2"
x=lineout(f,"<b><a class=taxlink href=engine/profile.rexx/"||therace||">"||post.title post.firstname post.dynasty||"</a></b> of the" race.therace||".<br/>")
x=lineout(f2,"<p><b><a class=taxlink href=engine/profile.rexx/"||therace||">"||post.title post.firstname post.dynasty||"</a></b> of the" race.therace||".</p>")

say "<p>Your game file is being prepared," post.title post.firstname post.dynasty "of the" race.therace".</p>"
say "<p>Shortly, you will be prompted to download a file.  Save this in your Ibex directory.</p>"

say "</body></html>"

call logg
exit

/*------------------------------*/
logg:
  parse arg m

  parse source . . me
  me=substr(me,lastpos("/",me)+1)

  thishost=getenv("HTTP_HOST")
  
  if pos("hexibex.us",thishost)>0 then
    logfile="/kunden/homepages/20/d100701421/htdocs/hexibex/engine/gw.log"
  else
    logfile="/Users/jeff/Sites/ibex/gw.log"
  
  call lineout logfile,me date("U") time() getenv("REMOTE_ADDR") therace """"||post.dynasty||"""" m """"||getenv("HTTP_USER_AGENT")||""""
return 0


procpost:
flag=0
rest=postdata
do while length(rest)>0
  parse var rest +0 a "=" b "&" rest
  upper a
  b=deweb(b,"+")
  post.a=b
end
return


DeWeb: PROCEDURE; PARSE ARG Input, Opts


oops:
say "<p style=""color:red""> invalid info. </p>"