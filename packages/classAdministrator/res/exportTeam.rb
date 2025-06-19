# Set OCTOKIT_ACCESS_TOKEN to authenticate

require "octokit"
require "csv"

Octokit.auto_paginate = true
members = Octokit.org_members "Estia-1a"
teams = Octokit.org_teams "Estia-1a"

# Then, for example:


CSV.open("export-all-team.csv", "wb") do |csv|
  csv << ["Team name", "repoName", "commits", "issues","members", "Member name 1", "Member name 2", "Member name 3", "Member name 4", "Member name 5"]
  teams.each do |t|
    members=Octokit.team_members t[:id]
    repos = Octokit.team_repositories t[:id]
    commits = Array.new
    repo = nil

    repos.each do |r| 
      if r[:name] =~ /pgi-2022-.*/ then
        repo = r 
      end
    end


    if( repo != nil) then
      begin 
        commits = Octokit.commits repo[:id]
      rescue 
        commits = Array.new
      end 
      #Create two line per team
      header= Array.new

      # Team name
      header << t[:name]
      header << "#{repo[:name]}"
      header << "#{commits.length}"      
      header << "#{repo[:open_issues_count]}"
      header << "#{members.length}"
      # Each member
      members.each do |m|
        commitsCount = 0
        if( repo != nil  )
          commits.each do |c|
            if(c[:author] != nil && c[:author][:id] == m[:id])
              commitsCount = commitsCount + 1
            end
          end
        end
        header << "#{m[:login]} (#{commitsCount})"
      end

      csv << header
    end
    
  end
end
