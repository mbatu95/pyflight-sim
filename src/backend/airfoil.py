import numpy as np

def naca4(m, p, t, n=100):
    """
    Generate NACA 4-digit airfoil coordinates.
    
    Parameters:
        m : max camber (0-1)
        p : position of max camber (0-1)
        t : max thickness (0-1)
        n : number of points along chord
    Returns:
        x, y_upper, y_lower : arrays of coordinates
    """
    x = np.linspace(0, 1, n)
    
    # Thickness distribution
    yt = 5 * t * (0.2969*np.sqrt(x) - 0.1260*x - 0.3516*x**2 + 0.2843*x**3 - 0.1015*x**4)
    
    # Camber line
    yc = np.zeros_like(x)
    dyc_dx = np.zeros_like(x)
    
    for i in range(n):
        if x[i] < p:
            yc[i] = (m/p**2) * (2*p*x[i] - x[i]**2)
            dyc_dx[i] = 2*m/p**2 * (p - x[i])
        else:
            yc[i] = (m/(1-p)**2) * ((1-2*p) + 2*p*x[i] - x[i]**2)
            dyc_dx[i] = 2*m/(1-p)**2 * (p - x[i])
    
    theta = np.arctan(dyc_dx)
    
    # Upper and lower surfaces
    xU = x - yt * np.sin(theta)
    yU = yc + yt * np.cos(theta)
    xL = x + yt * np.sin(theta)
    yL = yc - yt * np.cos(theta)
    
    return xU, yU, xL, yL
