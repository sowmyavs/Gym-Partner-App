import json
with open("dummy_data.json",'r') as f:
    users = json.load(f)
#print(users[0])
current_user=users[1]

match_scores={} # key: userid , value: match score 

def match_profiles(users,current_user):
    for user in users:
        score=0
        if user["_id"] == current_user["_id"]:
            continue 
        if user["_id"] in set(current_user["blocked_users"]):
            continue  
        if user["favorite_gym"]!=current_user["favorite_gym"]:
            continue 
        current_user_de=set(current_user["desired_exercise"])
        user_de=set(user["desired_exercise"])
        intersection= current_user_de & user_de
        symmetric_difference = current_user_de ^ user_de
        score+=len(intersection)*6-len(symmetric_difference)
        if score <= 0:
            continue
        current_user_exp=int(current_user["experience_level"])
        if "experience_level" not in user:
            continue
        user_exp=int(user["experience_level"])
        score+= 10-abs(current_user_exp-user_exp)
        match_scores[user["_id"]]=score
    match_scores_sorted=sorted(match_scores.items(), key=lambda x:x[1], reverse=True)  
    user_id_dict={}
    for user in users:
        user_id_dict[user["_id"]]=user
    result=[]
    for user_id, score in match_scores_sorted:
        result.append(user_id_dict[user_id])
    return result    
     
res=match_profiles(users,current_user)
print(res)
        
        
    



