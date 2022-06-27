from github import Github
import time 
repositories= [
"pgi-2022-100familles",
"pgi-2022-2",
"pgi-2022-aad",
"pgi-2022-afg",
"pgi-2022-allez-om-mec",
"pgi-2022-b0tt0m",
"pgi-2022-bbf",
"pgi-2022-bigeaud",
"pgi-2022-broma",
"pgi-2022-caha-creativity",
"pgi-2022-coding",
"pgi-2022-create-a-new-team",
"pgi-2022-dessert-informatique",
"pgi-2022-dlan",
"pgi-2022-ekip",
"pgi-2022-ekip-7",
"pgi-2022-equipe233",
"pgi-2022-equipe_ajkf",
"pgi-2022-et_sa_mere_hein",
"pgi-2022-eyecu",
"pgi-2022-faratak",
"pgi-2022-gif-or-jif",
"pgi-2022-gim",
"pgi-2022-gimie",
"pgi-2022-git4life-3",
"pgi-2022-groupe-4-0",
"pgi-2022-groupe-info",
"pgi-2022-groupe_projet_info-bff",
"pgi-2022-informaticator-13000",
"pgi-2022-join-me",
"pgi-2022-lajeuneequipe",
"pgi-2022-laxs",
"pgi-2022-le",
"pgi-2022-les-boulish-ette",
"pgi-2022-les-golems",
"pgi-2022-les-hsiiiloub",
"pgi-2022-lesbranlux",
"pgi-2022-lesmarc",
"pgi-2022-lespetitsinformaticiensdudimanche",
"pgi-2022-lespinzuti",
"pgi-2022-lespnj",
"pgi-2022-lestigres",
"pgi-2022-llbecb",
"pgi-2022-los-tigres",
"pgi-2022-maaaarc",
"pgi-2022-metaverse",
"pgi-2022-mrcs",
"pgi-2022-multivers",
"pgi-2022-ngh-team",
"pgi-2022-pgi-la-zone",
"pgi-2022-pillule",
"pgi-2022-projet-genie-info",
"pgi-2022-projet-genie-info-grp6",
"pgi-2022-projet-info-team2",
"pgi-2022-projet-spe",
"pgi-2022-projet_info_3gh",
"pgi-2022-projet_info_ag",
"pgi-2022-projet_info_geae",
"pgi-2022-rapide-et-dangereux",
"pgi-2022-realtigers",
"pgi-2022-rockey",
"pgi-2022-seul-au-monde",
"pgi-2022-sigmund",
"pgi-2022-sirop-d-peche",
"pgi-2022-stevejobs",
"pgi-2022-team",
"pgi-2022-team-glan",
"pgi-2022-team-jppng",
"pgi-2022-teamwin"
]

#repositories= [ "test-projet-prof-team-prof" ]
GIT_TOKEN="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"
g = Github(GIT_TOKEN)


from pathlib import Path
data = Path('../../workflows/evaluation.yml').read_text()

for team in repositories:
    try: 
        
        repoTarget = g.get_repo("Estia-1a/" + team)        
        contents = repoTarget.get_contents(".github/workflows/evaluation.yml", ref="main")
        repoTarget.update_file(path=contents.path, content=data, message="Automatic Updating Evaluator", sha=contents.sha, branch="main")
        print( team + " Success! ")
        time.sleep(0.5)
    except BaseException as err:
        print( team + " ERROR! ")
        print(f"Unexpected {err=}, {type(err)=}")