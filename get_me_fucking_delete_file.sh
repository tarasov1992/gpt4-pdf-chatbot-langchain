# If you don't remember the exact path/name, search the log for deleted files
git log --diff-filter=D --summary | grep delete
# Find the file you want to get from the ouput, and use the path
# Find the commits that involved that path
# git log --all -- exammples/llm.ts
# Bring the file back to life to the current repo (sha commit of parent of commit that deleted)
# git checkout shaofthecommitthatdeletedthefile^ -- exammples/llm.ts