"""Rebuild the two-page, text-based resume. Requires reportlab."""
from pathlib import Path
import argparse
parser=argparse.ArgumentParser()
parser.add_argument("--target",choices=["general","cloud-support","junior-devops"],default="general")
target=parser.parse_args().target
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
FONT_DIR=Path("/usr/share/fonts/truetype/dejavu")
pdfmetrics.registerFont(TTFont("ResumeSans",str(FONT_DIR/"DejaVuSans.ttf")))
pdfmetrics.registerFont(TTFont("ResumeSans-Bold",str(FONT_DIR/"DejaVuSans-Bold.ttf")))
pdfmetrics.registerFontFamily("ResumeSans",normal="ResumeSans",bold="ResumeSans-Bold",italic="ResumeSans",boldItalic="ResumeSans-Bold")
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/resume'/({'general':'Kushagra_Pandey_Resume.pdf','cloud-support':'Kushagra_Pandey_Cloud_Support_Resume.pdf','junior-devops':'Kushagra_Pandey_Junior_DevOps_Resume.pdf'}[target])
styles={
 'name':ParagraphStyle('name',fontName='ResumeSans-Bold',fontSize=23,leading=27,spaceAfter=5),
 'role':ParagraphStyle('role',fontName='ResumeSans-Bold',fontSize=11,leading=14,spaceAfter=5),
 'contact':ParagraphStyle('contact',fontName='ResumeSans',fontSize=9,leading=12,spaceAfter=3),
 'section':ParagraphStyle('section',fontName='ResumeSans-Bold',fontSize=10.5,leading=13,spaceBefore=12,spaceAfter=6,textColor=colors.HexColor('#153c58')),
 'body':ParagraphStyle('body',fontName='ResumeSans',fontSize=9.5,leading=13,spaceAfter=5),
 'title':ParagraphStyle('title',fontName='ResumeSans-Bold',fontSize=10.5,leading=14,spaceBefore=5,spaceAfter=3),
 'bullet':ParagraphStyle('bullet',fontName='ResumeSans',fontSize=9.5,leading=13,leftIndent=10,firstLineIndent=-8,spaceAfter=4),
 'link':ParagraphStyle('link',fontName='ResumeSans',fontSize=8.7,leading=11.5,spaceAfter=4,textColor=colors.HexColor('#153c58')),
}
story=[]
def p(text,style='body'): story.append(Paragraph(text,styles[style]))
def bullet(text):p('- '+text,'bullet')
def section(text):p(text,'section')
def link(url,label=None):return '<link href="'+url+'" color="#153c58">'+(label or url.replace('https://',''))+'</link>'
p('KUSHAGRA PANDEY','name')
p({'general':'Infrastructure Support | Azure Certified | Cloud &amp; DevOps Foundations','cloud-support':'Cloud &amp; Infrastructure Support | Azure AZ-104 / AZ-900','junior-devops':'Junior DevOps Candidate | Linux, Automation &amp; Containers'}[target],'role')
p(link('mailto:kushagrapandey102@gmail.com','kushagrapandey102@gmail.com')+' | India','contact')
p(link('https://kushagra-portfolio-plum.vercel.app/')+' | '+link('https://github.com/kushagrapandey-cmd'),'contact')
p(link('https://www.linkedin.com/in/kushagra-pandey-353b71175'),'contact')
section('PROFESSIONAL SUMMARY')
if target=='cloud-support':
 p('Target: Cloud / Infrastructure Support. Brings enterprise incident triage, server diagnostics, monitoring, escalation and ICC shift leadership, supported by Azure Administrator and Fundamentals certifications.')
elif target=='junior-devops':
 p('Target: Junior DevOps. Brings production support discipline and project experience with Bash/Python automation, Docker, Kubernetes probes, recovery drills and GitHub Actions validation. Container and CI experience comes from reproducible labs.')
p('Infrastructure support professional at HCLTech with experience in Linux and Windows server troubleshooting, infrastructure monitoring, incident coordination and ICC shift leadership. Microsoft Azure AZ-104 and AZ-900 certified, with hands-on project foundations in Bash, Python, Docker, Kubernetes and GitHub Actions. Combines enterprise operations experience with cloud recovery labs and deployed full-stack applications; targeting cloud support, Azure administration and junior Cloud/DevOps roles.')
section('TECHNICAL SKILLS')
p('<b>Infrastructure operations:</b> Linux, Windows Server, service-status checks, CPU/memory/disk diagnostics, log analysis, SSH, RDP, incident triage, escalation, SLA-aware support, SOPs and shift handovers.')
p('<b>Cloud and networking:</b> Azure and AWS portal health checks; Azure administration foundations, Azure CLI, TCP/IP, DNS, ports and connectivity troubleshooting. AZ-104 and AZ-900 certified.')
p('<b>Automation and delivery - project work:</b> Bash, Python, Git, GitHub Actions CI, Docker, Kubernetes, kubectl, readiness/liveness probes, deployments, resource limits and rollback exercises.')
p('<b>Application stack:</b> JavaScript, TypeScript, React, Next.js, Node.js, Express, REST APIs, SQL, PostgreSQL and MongoDB. <b>Operations tools:</b> SolarWinds, BHOM, PuTTY, SVM and ticketing workflows.')
section('PROFESSIONAL EXPERIENCE')
p('HCLTech | Infrastructure Support &amp; ICC Operations | Dec 2024 - Present','title')
p('<b>Benchmark Electronics - ICC Shift Lead | Nov 2025 - Present</b>')
for t in [
'Lead shift coordination, roster coverage and handovers; track critical alerts, pending incidents and follow-ups with Windows, backup, network and storage teams.',
'Supported operational go-live and early stabilization by helping establish monitoring routines, team coordination and day-to-day ICC support practices.',
'Created standard operating procedures for monitoring, incident handling, escalation and shift handovers to provide consistent operational guidance.',
'Monitor SolarWinds alerts and email-driven queues; review ticket routing, incident priority and investigation chronology before coordinating the next action.',
'Communicate critical-alert status and monitoring requirements with clients and customer stakeholders; maintain cross-team communication groups and clear ownership of follow-ups.'
]:bullet(t)
p('<b>Ericsson - Rhythm Team, L1.5 Infrastructure Support | Dec 2024 - Oct 2025</b>')
for t in [
'Provided L1.5 support for Linux and Windows servers, including AWS- and Azure-hosted systems, using approved diagnostic and escalation procedures.',
'Investigated service status, CPU, memory, disk usage, connectivity and logs; used PuTTY/SSH and RDP for access, and cloud portals for resource-health checks.',
'Reviewed infrastructure events through BHOM and operational queues; recorded findings, maintained incident updates and escalated unresolved issues to specialist teams.',
'Coordinated Multiple Failed Login (MFL) control activities with two team members, tracked investigation follow-ups and maintained SLA-aware shift handovers.'
]:bullet(t)
story.append(PageBreak())
section('SELECTED CLOUD & SOFTWARE PROJECTS')
p('CloudOps Sentinel | Linux, Bash, Python, Docker, Kubernetes, GitHub Actions','title')
p(link('https://cloudops-sentinel-three.vercel.app/')+' | '+link('https://github.com/kushagrapandey-cmd/Devops-Learning/tree/main/projects/cloudops-sentinel','Source &amp; runbooks'),'link')
for t in [
'Operations toolkit with JSON host-health checks, read-only Linux triage reports, structured HTTP-log summaries and separate liveness, readiness and diagnostic API endpoints.',
'Container lab uses a non-root image, read-only root filesystem, two replicas, ClusterIP Service, CPU/memory limits and rolling updates. GitHub Actions validates tests, image builds and kind recovery drills.',
'Interactive incident simulator covers readiness failure, broken images, memory limits and Service selectors. Linux VM workbench supports command-driven service, port, networking and patch-maintenance exercises.',
'Includes real systemd installation, inspection and configuration backup/restore scripts, plus optional Azure ACR/AKS scripts and VM Bicep templates. Live demo is a simulation; Azure deployment is not claimed.'
]:bullet(t)
p('MediConnect | React, Express, PostgreSQL, Vercel','title')
p(link('https://mediconnect-psi-sand.vercel.app/')+' | '+link('https://github.com/kushagrapandey-cmd/mediconnect','Source'),'link')
for t in [
'Academic healthcare-record application with upload, preview, search, activity history and patient-controlled sharing. Patients select documents, an individual doctor and a time-limited access grant.',
'Current implementation includes salted password hashing, HttpOnly sessions, recovery keys and server-side permission checks; nearby-care discovery uses an India OpenStreetMap dataset. Synthetic-data showcase, with no UHI/ABDM integration.'
]:bullet(t)
p('YTGuide | Python, MiniLM / ONNX, JavaScript, Node.js, Neon Auth, PostgreSQL','title')
p(link('https://ytguide-five.vercel.app/')+' | '+link('https://github.com/kushagrapandey-cmd/First_ML_project','Source'),'link')
for t in [
'Learning workspace combines live YouTube retrieval with pretrained multilingual semantic embeddings, TF-IDF and channel diversity to rank lessons for a specific study goal.',
'Authenticated notes, saved lessons, collections, timestamp bookmarks and playback progress sync to PostgreSQL; version checks surface note conflicts. Shared caching and retrieval budgets control provider usage.'
]:bullet(t)
p('WWW-of-Anime | React, Vite, Node.js, PostgreSQL','title')
p(link('https://www-of-anime.vercel.app/')+' | '+link('https://github.com/kushagrapandey-cmd/WWW-of-Anime','Source'),'link')
bullet('Interactive fan application with private turn-based battles, character comparisons, quizzes and persistent profiles. Server-owned game rules calculate results; transactional updates and session checks protect account progress and match actions.')
p('Project scope: academic/personal and AI-assisted development. Repository case studies document implementation, verification and trade-offs; project experience is distinct from production infrastructure ownership.','link')
section('CERTIFICATIONS')
p('<b>AZ-104:</b> Microsoft Azure Administrator<br/><b>AZ-900:</b> Microsoft Azure Fundamentals')
section('INTERNSHIP')
p('Bharat Intern | Full-stack Web Development | Jul 2023 - Aug 2023','title')
bullet('Developed React-based web projects with MongoDB-backed services, user-authentication workflows and responsive interfaces.')
section('EDUCATION')
p('<b>Bachelor of Technology, Computer Science</b> | Axis Institute of Technology | 2020 - 2024<br/><b>Intermediate</b> | K.R. Education Center | 2017 - 2018')
def footer(c,d):
 c.setFont('ResumeSans',8);c.setFillColor(colors.HexColor('#566474'));c.drawRightString(552,23,str(d.page))
OUT.parent.mkdir(parents=True,exist_ok=True)
SimpleDocTemplate(str(OUT),pagesize=(595.28,841.89),rightMargin=40,leftMargin=40,topMargin=33,bottomMargin=36,title='Kushagra Pandey - Infrastructure, Azure and Cloud Resume',author='Kushagra Pandey').build(story,onFirstPage=footer,onLaterPages=footer)
print(OUT)
