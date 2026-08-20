# Portable Proposal Base

`HECR_Client_Proposal_Base_v1.html` is a **single-file proposal template**. It has inline CSS and JavaScript; it requires no Manus project, build command, npm package, or image folder.

## Open and Preview

Open the HTML file by double-clicking it in a browser, drag it into a browser window, or upload it to another tool that previews HTML files. The **Print / Save PDF** button creates a printable landscape PDF from the same source.

## Edit Without Regressing

Open `HECR_Client_Proposal_Base_v1.html` in a text editor. Change only the `PROPOSAL_CONTENT` object marked **SAFE EDIT ZONE**. Keep headings and descriptions short so the layout remains stable. Read `CHANGE_CONTROL.md` before changing any visual code.

## Use With Other AI Tools

Give the tool these three files together:

1. `HECR_Client_Proposal_Base_v1.html` — the visual base.
2. `proposal-content.example.json` — the allowed content/editing contract.
3. `CHANGE_CONTROL.md` — the non-regression rules.

Ask the tool to update the JSON/content object only, never the visual tokens or renderer, unless you explicitly request a new base version.
