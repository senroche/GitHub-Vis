'''
Created on 31 Oct 2019

@author: Sean Roche
'''

from github import Github

# Create an instance with access token / username and password

g = Github("")

#g = Github("user", "password")
#g = Github("access token")

user = g.get_user()
user.login
print("Logged in")
print("User repositories: ")
for repo in g.get_user().get_repos():
    print(repo.name)