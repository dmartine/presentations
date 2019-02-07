from arcgis.gis import GIS

# credentials for GIS
url = 'https://martinez10.esri.com/arcgis/home/'
username = ''
password = ''

gis = GIS(url, username, password, verify_cert=False)


# Script to clean up the users, content and groups created for demo


print("RUNNING CLEANUP")
print("---------------")


# region remove groups
group_list = gis.groups.search("owner:dmart")
print("")
print("Deleting groups")
print("---------------")

for group in group_list:
    try:
        print("Deleting ", group.title, end= "  ##  ")
        group.delete()
        print("success")
    except Exception as group_del_ex:
        print("Error deleting : " , str(group_del_ex))
# endregion

#region remove content for each user
print("")
print("Deleting user content")
print("---------------------")
user_list = gis.users.search("")
try:
    for user in user_list:
        print('User : ', user.username, end=" # ")
        if user.fullName in ['Administrator', 'Esri', 'Esri Navigation']:
            print('skipped')
            continue

        user_content = gis.content.search('owner:{0}'.format(user.username))
        for item in user_content:
            print('Deleting : ', item.title, end = " # ")
            delete_status = item.delete()
            print(str(delete_status), end = " | ")
        print('empty')

except Exception as content_del_ex:
    print(str('content_del_ex'))
#endregion

# region remove users
user_list = gis.users.search()
print("")
print("Deleting users")
print("--------------")

for user in user_list:
    if user.username == "dmart" or user.username.startswith("esri_") or user.username.startswith("WORLD"):
        continue
    else:
        print("Deleting ", user.username, end = "  ##  ")
        user.delete()
        print("success")
# endregion


gis.admin.ux.set_logo(r'C:\Users\dmart\Samples\helper_files\1x1.png')
gis.admin.ux.set_background(is_built_in=True)
gis.admin.ux.set_banner('banner-2', True)
gis.admin.ux.name = "ArcGIS Enterprise"
gis.admin.ux.description = "ArcGIS Enterprise"

for item in gis.content.search('NC'):
    item.delete()

for item in gis.content.search('FM'):
    item.delete()

for wm in gis.content.search('response locations', 'Web Map', max_items=1000):
    wm.delete()

print("\n All clean")