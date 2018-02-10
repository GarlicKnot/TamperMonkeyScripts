#create distribution space and probabilities for boss and egg IVs
#approach is to create the sample space using itertools and then use boolean summation to find area of sample space in equal to or more than higher IVs

import itertools
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

#sample space of 3 dice rolls from 10-15
#samplespace = [[10,11,12,13,14,15],[10,11,12,13,14,15],[10,11,12,13,14,15]]
#sample = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
l1 = [1] * 18
l2 = [2] * 18
l3 = [3] * 19
l4 = [4] * 18
l5 = [5] * 17
l6 = [6] * 10

sample  = [1 , 2, 3, 4, 5, 6]
dist    = [18,18,19,18,17,10]

sample2 = [sample,sample]
sample3 = [sample,sample,sample]
sample4 = [sample,sample,sample,sample]
sample5 = [sample,sample,sample,sample,sample]

dist2   = [dist,dist]
dist3   = [dist,dist,dist]
dist4   = [dist,dist,dist,dist]
dist5   = [dist,dist,dist,dist,dist]


#create all dice roll combinations in a list
combinationlist2 = list(itertools.product(*sample2))
combinationlist3 = list(itertools.product(*sample3))
combinationlist4 = list(itertools.product(*sample4))
combinationlist5 = list(itertools.product(*sample5))
#take the list of combinations and sum each set -> [14,15,15]->[44]
comboarray2 = np.asarray(combinationlist2)
combosum2 = np.sum(comboarray2,1)
comboarray3 = np.asarray(combinationlist3)
combosum3 = np.sum(comboarray3,1)
comboarray4 = np.asarray(combinationlist4)
combosum4 = np.sum(comboarray4,1)
comboarray5 = np.asarray(combinationlist5)
combosum5 = np.sum(comboarray5,1)

print "probability elder lvl 3:"
print float(sum(combosum3>=11))/216

clothhead    = ["Cloth Production T1","Cloth Production T2","Cloth Production T3","Cloth Production T4"]
onehead      = ["One Part Components T1","One Part Components T2","One Part Components T3","One Part Components T4"]
twohead      = ["Two Part Components T1","Two Part Components T2","Two Part Components T3","Two Part Components T4"]
threehead    = ["Three Part Components T1","Three Part Components  T2","Three Part Components T3","Three Part Components T4"]
gath1        = ["Gath 1 T1 Resources","Gath 1 T2 Resources","Gath 1 T3 Resources","Gath 1 T4 Resources","Gath 1 T5 Resources"]
gath2        = ["Gath 2 T1 Resources","Gath 2 T2 Resources","Gath 2 T3 Resources","Gath 2 T4 Resources","Gath 2 T5 Resources"]
gath3        = ["Gath 3 T1 Resources","Gath 3 T2 Resources","Gath 3 T3 Resources","Gath 3 T4 Resources","Gath 3 T5 Resources"]
gath4        = ["Gath 4 T1 Resources","Gath 4 T2 Resources","Gath 4 T3 Resources","Gath 4 T4 Resources","Gath 4 T5 Resources"]
gath5        = ["Gath 5 T1 Resources","Gath 5 T2 Resources","Gath 5 T3 Resources","Gath 5 T4 Resources","Gath 5 T5 Resources"]

clothbreak   = [10,20,30,40]
onebreak     = [6,12,18,24]
twobreak     = [8,16,24,32]
threebreak   = [9,18,27,36]
gath1break   = [5, 10,15,20]
gath2break   = [10,20,30,40]
gath3break   = [15,30,45,60]
gath4break   = [20,40,60,80]
gath5break   = [25,50,75,100]

headers = clothhead + onehead + twohead + threehead + gath1 + gath2 + gath3 + gath4 + gath5

values = clothbreak + onebreak + twobreak + threebreak + gath1break + gath2break + gath3break + gath4break + gath5break



def breakvalcalc(breakval,header):
    #Level 1 - 2 dice, 0 bonus
    lvl1 = float(sum(combosum2>=(breakval-0)))/(6**2)
    #Level 2 - 2 Dice, 1 bonus
    lvl2 = float(sum(combosum2>=(breakval-1)))/(6**2)
    #Level 3 - 3 Dice, 1 bonus
    lvl3 = float(sum(combosum3>=(breakval-1)))/(6**3)
    #Level 4 - 3 Dice, 2 bonus
    lvl4 = float(sum(combosum3>=(breakval-2)))/(6**3)
    #Level 5 - 3 Dice, 2 bonus
    lvl5 = float(sum(combosum3>=(breakval-3)))/(6**3)
    #Level 6 - 4 Dice, 3 bonus
    lvl6 = float(sum(combosum4>=(breakval-4)))/(6**4)
    #Level 7 - 4 Dice, 3 bonus
    lvl7 = float(sum(combosum4>=(breakval-4)))/(6**4)
    #Level 8 - 4 Dice, 4 bonus
    lvl8 = float(sum(combosum4>=(breakval-5)))/(6**4)
    #Level 9 - 5 Dice, 4 bonus
    lvl9 = float(sum(combosum5>=(breakval-5)))/(6**5)
    #Level 10 - 5 Dice, 5 bonus
    lvl10 = float(sum(combosum5>=(breakval-6)))/(6**5)
    spread = pd.DataFrame({"0Name":[header],"Mastery1":[lvl1],"Mastery2":[lvl2],"Mastery3":[lvl3],"Mastery4":[lvl4],"Mastery5":[lvl5],"Mastery6":[lvl6],"Mastery7":[lvl7],"Mastery8":[lvl8],"Mastery9":[lvl9],"Mastery910":[lvl10],})
    return spread


probDF = pd.DataFrame()
for i in range(0,32):
    spread = breakvalcalc(values[i],headers[i])
    probDF = pd.concat([probDF,spread])


#print probDF
probDF = probDF
probDF.to_csv('ProbCSV.csv',index=False)


x = float(sum(combosum5>(28)))/(6**5)
print x
#print "testing spread"
#print breakvalcalc(5)


#
#
# for i in range (1:len(d)):
#     for j in range(1:len(clothbreak)):
#         clothbreak = cloth[j-1]
#         bonus      =
#
#         p2 = float(sum(combosum2>breakval))/(6**2)
#         p3 = float(sum(combosum3>breakval))/(6**3)
#         p4 = float(sum(combosum4>breakval))/(6**4)
#         p5 = float(sum(combosum5>breakval))/(6**5)
#
#


#
#
# #2/0
# m11 = float(sum(combosum2>=3))/36
# m12 = float(sum(combosum2>=6))/36
# m13 = float(sum(combosum2>=9))/36
# #2/1
# m21 = float(sum(combosum2>=2))/36
# m22 = float(sum(combosum2>=5))/36
# m23 = float(sum(combosum2>=8))/36
#
# #3/1
# m3 = float(sum(combosum3>=15))/216
# print "m3",m3
#
# #2/2
# m31 = float(sum(combosum3>=2))/216
# m32 = float(sum(combosum3>=5))/216
# m33 = float(sum(combosum3>=8))/216
#
# #2/2
# m41 = float(sum(combosum3>=1))/216
# m42 = float(sum(combosum3>=4))/216
# m43 = float(sum(combosum3>=7))/216
#
# #3/3
# m61 = float(sum(combosum4>=1))/(6**4)
# m62 = float(sum(combosum4>=3))/(6**4)
# m63 = float(sum(combosum4>=6))/(6**4)
#
# #3/3
# m81 = float(sum(combosum4>=1))/(6**4)
# m82 = float(sum(combosum4>=2))/(6**4)
# m83 = float(sum(combosum4>=5))/(6**4)
#
# #3/3
# m91 = float(sum(combosum5>=1))/(6**5)
# m92 = float(sum(combosum5>=2))/(6**5)
# m93 = float(sum(combosum5>=5))/(6**5)
#
#
# #Suppressed line to see the space as a gut check
# print "M1, M2, M3, M4, M6, M8, M9"
# print m11,m21,m31,m41,m61,m81,m91
# print m12,m22,m32,m42,m62,m82,m92
# print m13,m23,m33,m43,m63,m83,m93


# This is useful for predicting chance of finding over a number of boss battles but otherwise meh
# #Create empty vectors we'll fill with the linspaces
# s40 = []
# s41 = []
# s42 = []
# s43 = []
# s44 = []
# s45 = []
#
# #Create linspaces for the IV values using standard independent event probability formula for repeated independent events
# # P = 1 - Pnothappen^(iterations) = 1 - (1-Phappen)^(iterations)
# total = 16**3
# for i in range(1,3000):
#     s40.append((1.-(1-(p40)/total)**i)*100)
#     s41.append((1.-(1-(p41)/total)**i)*100)
#     s42.append((1.-(1-(p42)/total)**i)*100)
#     s43.append((1.-(1-(p43)/total)**i)*100)
#     s44.append((1.-(1-(p44)/total)**i)*100)
#     s45.append((1.-(1-(p45)/total)**i)*100)
#
# #x vector for plotting against
# xspace = np.linspace(1,3000,2999)
# #plotting the various y vectors
# p1, = plt.plot(xspace,s40,label='89% IV+')
# p2, = plt.plot(xspace,s41,label='91% IV+')
# p3, = plt.plot(xspace,s42,label='93% IV+')
# p4, = plt.plot(xspace,s43,label='96% IV+')
# p5, = plt.plot(xspace,s44,label='98% IV+')
# p6, = plt.plot(xspace,s45,label='100% IV')
#define x-axis bounds - add a bit on each edge so points aren't hidden
#plt.xlim(-.5,20.5)

# #graph info
# plt.title("Number of Boss Battles to See Certain IVs or Better")
# plt.xlabel("Number of Boss Fights")
# plt.ylabel("Percent chance of seeing IV or better")
# plt.legend(handles=[p1,p2,p3,p4,p5,p6])
# plt.legend(bbox_to_anchor=(0, 1), loc=2,fontsize=11, borderaxespad=0.)
# plt.grid(which='both') #give a grid to make end user interpretation a bit easier
# linplot, = plt.plot(xspace,series,'ro')
# plt.xlim(79.5,100.5)
# plt.ylim(-.1,4)
# plt.title("Distribution of High IVs")
# plt.ylabel("Percent of Pokemon this IV or Higher")
# plt.xlabel("IV Percentage (80% - 100%)")
# plt.show()
