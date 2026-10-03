"""Generate the portfolio resume from its shared TypeScript content model."""
import json
import subprocess
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak

ROOT = Path(__file__).resolve().parents[1]
js = """const ts=require('typescript'),fs=require('fs'),vm=require('vm');
const source=ts.transpileModule(fs.readFileSync('data/profile.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const context={exports:{}};vm.runInNewContext(source,context);process.stdout.write(JSON.stringify(context.exports));"""
data = json.loads(subprocess.check_output(['node', '-e', js], cwd=ROOT))
output = ROOT / 'public/resume/Kushagra_Pandey_Resume.pdf'
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='Name', fontName='Helvetica-Bold', fontSize=22, leading=26, textColor=colors.HexColor('#132d46'), spaceAfter=7))
styles.add(ParagraphStyle(name='SectionLabel', fontName='Helvetica-Bold', fontSize=11, leading=14, textColor=colors.HexColor('#132d46'), spaceBefore=13, spaceAfter=6))
styles.add(ParagraphStyle(name='BodyCopy', fontName='Helvetica', fontSize=9.6, leading=13.5, spaceAfter=5))
styles.add(ParagraphStyle(name='Role', fontName='Helvetica-Bold', fontSize=11, leading=15, spaceBefore=7, spaceAfter=3))
styles.add(ParagraphStyle(name='BulletCopy', parent=styles['BodyCopy'], leftIndent=10, firstLineIndent=-7, spaceAfter=4))
styles.add(ParagraphStyle(name='SmallCopy', fontName='Helvetica', fontSize=8.6, leading=12, textColor=colors.HexColor('#475569'), spaceAfter=6))
flow=[]
def safe(text): return escape(text.replace('–','-').replace('·',' | '))
def para(text, style='BodyCopy'): flow.append(Paragraph(safe(text), styles[style]))
def section(text): para(text.upper(),'SectionLabel')
profile=data['profile']
para(profile['name'].upper(),'Name')
para(profile['headline'],'Role')
para(profile['direction'],'BodyCopy')
para(profile['email']+' | '+profile['linkedin']+' | '+profile['github'],'SmallCopy')
section('Professional summary');para(profile['summary'])
section('HCLTech experience | Dec 2024 - Present')
for role in data['experience']:
 para(role['project']+' | '+role['period'],'Role')
 para(role['context'],'BodyCopy')
 para('Tools / workflows: '+', '.join(role['tools']),'SmallCopy')
 for item in role['responsibilities']: para('- '+item,'BulletCopy')
flow.append(PageBreak())
para('SKILLS, CERTIFICATIONS & PROJECTS','Role')
section('Technical skills')
para('Professional: '+', '.join(data['focusAreas']['professional'])+'.')
para('Support tools: BHOM, AWS / Azure portals, PuTTY / SSH, RDP, SVM, SolarWinds and incident workflows.')
para('Developing: '+', '.join(data['focusAreas']['learning'])+'.')
para('Software foundation: '+', '.join(data['softwareFoundation'])+'.')
section('Certifications')
for cert in data['certifications']: para(cert['code']+' | '+cert['name'])
section('Selected software projects')
for title,detail in [
 ('MediConnect | MERN, Google Drive API','Healthcare-record prototype with patient / doctor workflows, document upload and retrieval, MongoDB metadata and Google Drive-backed storage.'),
 ('Riverflow | Next.js, TypeScript, Appwrite, Zustand','StackOverflow-style learning application with authentication and voting flows.'),
 ('YTGuide | Python, Streamlit, Pandas','Academic team recommendation prototype presenting five study-video recommendations by topic.'),
 ('Kushagra Portfolio | Next.js, TypeScript, Vercel','Engineering portfolio with an accessible responsive interface, server-side contact delivery and automated quality checks.')]:
 para(title,'Role');para(detail)
section('DevOps learning journey')
para('github.com/kushagrapandey-cmd/Devops-Learning','SmallCopy')
para('Public workspace for Linux, networking, Azure, Bash / Python and Git notes, scripts and labs. Docker, Terraform, CI/CD, Kubernetes / AKS and observability are roadmap topics, not claims of completed production expertise.')
section('Internship')
para(data['internship']['title']+' | '+data['internship']['organization']+' | '+data['internship']['period'],'Role')
for detail in data['internship']['details']:para('- '+detail,'BulletCopy')
section('Education')
for item in data['education']:para(item['qualification']+' | '+item['institution']+' | '+item['period'])
def footer(canvas,doc):
 canvas.setFont('Helvetica',8);canvas.setFillColor(colors.HexColor('#64748b'))
 canvas.drawString(42,23,'Kushagra Pandey | Infrastructure, Azure & Cloud / DevOps direction')
 canvas.drawRightString(A4[0]-42,23,str(doc.page))
SimpleDocTemplate(str(output),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=35,bottomMargin=38,title='Kushagra Pandey - Resume',author=profile['name']).build(flow,onFirstPage=footer,onLaterPages=footer)
print(output)
