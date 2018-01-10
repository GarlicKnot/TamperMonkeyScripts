import numpy as np

level  = np.linspace(1,10,10)
dice   = np.floor(level/3)
bonus  = np.floor(level/2)
bonus2 = np.floor(level/3)*3

avg   = dice*3.5+bonus
best  = dice*6+bonus
rare1 = np.repeat(9,10)
rare2 = np.repeat(18,10)
rare3 = np.repeat(27,10)

diff2 = 1

import matplotlib.pyplot as plt

plt.plot(level,avg)
plt.plot(level,best,'r')
plt.plot(level,rare1,'g')
plt.plot(level,rare2,'g')
plt.plot(level,rare3,'g')
plt.plot(level,dice*6+bonus2,'k')
plt.show()
